import { AppBottomNav } from '@/components/AppBottomNav';
import { AppSidebar } from '@/components/AppSideBar';
import { AdminContextWrapper } from '@/hooks/context/AdminContextWrapper';
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
import { adminCookieKey, AuthUserRoles, buildSafeUrl, decodeJwtToken, FetchMethods } from '@workspace/ui/lib';
import { cn } from '@workspace/ui/lib/utils';
import { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import './globals.css';

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
      type: AppConfig.type as 'website',
      locale: AppConfig.locale,
      url: AppConfig.siteUrl
    },
    robots: {
      index: true,
      follow: true
    },
    generator: 'Next.js',
    keywords: AppConfig.keywords
  } satisfies Metadata;
  return metadata;
}

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--primary-font', style: 'normal' });
export const viewport: Viewport = {
  themeColor: '#FFFFFF'
};

interface Props {
  children: React.ReactNode;
}

const verifyAccessToken = async (token: string) => {
  return await fetchRequest({
    fetchMethod: FetchMethods.POST,
    pathName: '/auth/verify',
    init: {
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  });
};

const getUser = async () => {
  const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Admin);
  const client = await getClient();
  const { data } = await client.query({ query: GET_CREATOR_PROFILE_QUERY });
  return data?.getCreatorProfile as CreatorProfilesEntity;
};

const handleValidateAuth = async () => {
  const accessToken = (await cookies()).get(adminCookieKey)?.value;
  const decodedToken = decodeJwtToken(accessToken);

  if (decodedToken && !decodedToken.roles.includes(AuthUserRoles.ADMIN)) {
    return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  }

  if (!accessToken) return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  try {
    const response = await verifyAccessToken(accessToken);
    if (response) return await getUser();
  } catch {
    return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  }
};

export default async function RootLayout({ children }: Props) {
  const admin = await handleValidateAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="rating" content="RTA-5042-1996-1400-1577-RTA" />
        <meta name="classification" content="Adult" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={cn(inter.variable, 'overscroll-none')}>
        <ApolloWrapper apiGraphqlUrl={configService.NEXT_PUBLIC_API_GRAPHQL_URL} role={UserRoles.Admin}>
          <AdminContextWrapper creator={admin as CreatorProfilesEntity}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <SidebarProvider defaultOpen>
                <div className="flex h-screen w-full overflow-hidden">
                  <AppSidebar />
                  <SidebarInset className="flex flex-1 flex-col min-w-0">
                    <Toaster position="top-center" closeButton richColors theme="system" />
                    <main className="relative flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
                  </SidebarInset>
                </div>
              </SidebarProvider>
              <AppBottomNav />
            </ThemeProvider>
          </AdminContextWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
