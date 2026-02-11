import { AppHeader } from '@/components/AppHeader';
import { AppSideBar } from '@/components/AppSideBar';
import { CreatorStatusGuard } from '@/components/status/CreatorStatusGuard';
import { CreatorContextWrapper } from '@/hooks/context/useCreator';
import { fetchRequest } from '@/hooks/useAPI';
import { AppConfig } from '@/lib/app.config';
import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { ApolloWrapper } from '@workspace/gql/ApolloWrapper';
import { GET_CREATOR_PROFILE_QUERY } from '@workspace/gql/api/creatorAPI';
import { CreatorProfilesEntity, UserRoles } from '@workspace/gql/generated/graphql';
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar';
import { Toaster } from '@workspace/ui/components/sonner';
import '@workspace/ui/globals.css';
import { AuthUserRoles, buildSafeUrl, creatorCookieKey, decodeJwtToken, FetchMethods } from '@workspace/ui/lib';
import { cn } from '@workspace/ui/lib/utils';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

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
      index: false,
      follow: false
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

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--primary-font', style: 'normal' });
export const viewport: Viewport = {
  themeColor: AppConfig.themeColor
};

const verifyAccessToken = async (token: string) => {
  return fetchRequest({
    fetchMethod: FetchMethods.POST,
    pathName: '/auth/verify',
    init: {
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' }
    }
  });
};

const getCreatorProfile = async (): Promise<CreatorProfilesEntity> => {
  const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Creator);
  const client = await getClient();
  const { data } = await client.query({ query: GET_CREATOR_PROFILE_QUERY });
  return data?.getCreatorProfile as CreatorProfilesEntity;
};

const validateCreatorSession = cache(async () => {
  const accessToken = (await cookies()).get(creatorCookieKey)?.value;
  const authAppUrl = buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL });

  if (!accessToken) redirect(authAppUrl);

  const decoded = decodeJwtToken(accessToken);

  if (!decoded || !decoded.roles.includes(AuthUserRoles.CREATOR)) redirect(authAppUrl);
  try {
    await verifyAccessToken(accessToken);
  } catch (error) {
    console.error(error.message);
    redirect(authAppUrl);
  }

  return getCreatorProfile();
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const creator = await validateCreatorSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Delegate-CH" content={AppConfig.delegateCh} />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={cn(inter.variable, 'overscroll-none ')}>
        <ApolloWrapper apiGraphqlUrl={configService.NEXT_PUBLIC_API_GRAPHQL_URL} role={UserRoles.Creator}>
          <CreatorContextWrapper creator={creator}>
            <Toaster position="top-center" richColors />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              value={{ light: 'light', dark: 'dark' }}
            >
              <CreatorStatusGuard>
                <SidebarProvider>
                  <AppSideBar />
                  <SidebarInset>
                    <AppHeader />
                    {children}
                  </SidebarInset>
                </SidebarProvider>
              </CreatorStatusGuard>
            </ThemeProvider>
          </CreatorContextWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
