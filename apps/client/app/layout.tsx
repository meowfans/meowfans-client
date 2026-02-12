import { AgeGate } from '@/components/AgeGate';
import { AppHeader } from '@/components/AppHeader';
import { AppSideBar } from '@/components/AppSideBar';
import { CookieConsent } from '@/components/CookieConsent';
import { FeatureGate } from '@/components/FeatureGate';
import { RTAFooter } from '@/components/RTAFooter';
import { fetchRequest } from '@/hooks/client/useAPI';
import { UserContextWrapper } from '@/hooks/context/UserContextWrapper';
import { AppConfig } from '@/lib/app.config';
import { configService } from '@/util/config';
import { GET_FAN_PROFILE_QUERY } from '@workspace/gql/api';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { ApolloWrapper } from '@workspace/gql/ApolloWrapper';
import { FanProfilesEntity, UserRoles } from '@workspace/gql/generated/graphql';
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar';
import { Toaster } from '@workspace/ui/components/sonner';
import '@workspace/ui/globals.css';
import { AuthUserRoles, buildSafeUrl, decodeJwtToken, fanCookieKey, FetchMethods } from '@workspace/ui/lib';
import { cn } from '@workspace/ui/lib/utils';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = {
    metadataBase: new URL(AppConfig.siteUrl),
    title: {
      template: AppConfig.template,
      default: AppConfig.title
    },
    alternates: {
      canonical: AppConfig.canonical
    },
    manifest: AppConfig.manifest,
    applicationName: AppConfig.applicationName,
    description: AppConfig.description,
    openGraph: {
      siteName: AppConfig.site_name,
      title: AppConfig.title,
      description: AppConfig.description,
      type: AppConfig.type,
      locale: AppConfig.locale,
      url: AppConfig.siteUrl,
      images: [
        {
          url: AppConfig.images.og,
          width: 1200,
          height: 630,
          alt: AppConfig.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: AppConfig.title,
      description: AppConfig.description,
      images: [AppConfig.images.og]
    },
    robots: {
      index: true,
      follow: true
    },
    generator: 'Next.js',
    keywords: AppConfig.keywords,
    verification: {
      other: {
        '6a97888e-site-verification': AppConfig.verification.site
      }
    },
    other: {
      rating: AppConfig.rta.rating,
      classification: AppConfig.rta.classification
    }
  } satisfies Metadata;
  return metadata;
}

export const viewport: Viewport = {
  themeColor: AppConfig.themeColor
};

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--primary-font' });

const verifyAccessToken = async (token: string) => {
  return fetchRequest({
    fetchMethod: FetchMethods.POST,
    pathName: '/auth/verify',
    init: {
      body: JSON.stringify({ token }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }
  });
};

const getStatus = async () => {
  try {
    const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);
    const client = await getClient();
    const { data } = await client.query({ query: GET_FAN_PROFILE_QUERY });
    return data?.getFanProfile as FanProfilesEntity;
  } catch {
    return null;
  }
};

const handleValidateAuth = async () => {
  const cookiesList = await cookies();
  const accessToken = cookiesList.get(fanCookieKey)?.value;
  const decodedToken = decodeJwtToken(accessToken);

  if (!accessToken || !decodedToken) return null;

  try {
    await verifyAccessToken(accessToken);

    switch (decodedToken.roles?.[0]) {
      case AuthUserRoles.ADMIN:
        return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL }));
      case AuthUserRoles.CREATOR:
        return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL }));
    }

    return await getStatus();
  } catch {
    return null;
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const fan = await handleValidateAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Delegate-CH" content={AppConfig.delegateCh} />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={cn(inter.variable, 'overscroll-none')}>
        <ApolloWrapper apiGraphqlUrl={configService.NEXT_PUBLIC_API_GRAPHQL_URL} role={UserRoles.Fan}>
          <UserContextWrapper fan={fan}>
            <AgeGate />
            <CookieConsent />
            <Toaster position="top-center" richColors />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              value={{ light: 'light', dark: 'dark' }}
            >
              <SidebarProvider>
                <AppSideBar />
                <SidebarInset>
                  <AppHeader />
                  <div id="main-content-scroll" className="flex flex-1 flex-col overflow-y-auto">
                    <FeatureGate>{children}</FeatureGate>
                    <RTAFooter />
                  </div>
                </SidebarInset>
              </SidebarProvider>
            </ThemeProvider>
          </UserContextWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
