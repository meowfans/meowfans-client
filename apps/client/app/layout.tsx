import { AgeConfirmation } from '@/app/(legal)/components/AgeConfirmation';
import { CookieBanner } from '@/app/(legal)/components/CookieBanner';
import { AppSidebar } from '@/components/AppSideBar';
import { Sse } from '@/components/Sse';
import { EventsProvider } from '@/hooks/context/EventsContextWrapper';
import { UserContextWrapper } from '@/hooks/context/UserContextWrapper';
import { fetchRequest } from '@/hooks/useAPI';
import { AppConfig } from '@/lib/app.config';
import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { ApolloWrapper } from '@workspace/gql/ApolloWrapper';
import { GET_FAN_PROFILE_QUERY } from '@workspace/gql/api/fanAPI';
import { FanProfilesEntity, UserRoles } from '@workspace/gql/generated/graphql';
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar';
import { Toaster } from '@workspace/ui/components/sonner';
import '@workspace/ui/globals.css';
import { AuthUserRoles, buildSafeUrl, decodeJwtToken, fanCookieKey, FetchMethods } from '@workspace/ui/lib';
import { cn } from '@workspace/ui/lib/utils';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { title } from 'radash';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const pathname = (await headerList).get('x-pathname') ?? '';

  const metadata = {
    metadataBase: new URL(AppConfig.siteUrl),
    title: {
      template: AppConfig.template,
      default: `${AppConfig.title} | ${title(pathname?.substring(1).replace(/\//, ' | '))}`
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
    generator: 'Next.js',
    keywords: AppConfig.keywords,
    icons: [
      { rel: 'apple-touch-icon', url: '/icons/logo_256.png' },
      { rel: 'icon', url: '/icons/logo_256.png' }
    ]
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const fan = await handleValidateAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="rating" content="RTA-5042-1996-1400-1577-RTA" />
        <meta name="classification" content="Adult" />
        <meta name="6a97888e-site-verification" content="ac2d60d2db24c5a92f5d5c0f5e5ce6a7" />
        <meta
          httpEquiv="Delegate-CH"
          content={`Sec-CH-UA https://s.magsrv.com;
           Sec-CH-UA-Mobile https://s.magsrv.com;
           Sec-CH-UA-Arch https://s.magsrv.com;
           Sec-CH-UA-Model https://s.magsrv.com;
           Sec-CH-UA-Platform https://s.magsrv.com;
           Sec-CH-UA-Platform-Version https://s.magsrv.com;
           Sec-CH-UA-Bitness https://s.magsrv.com;
           Sec-CH-UA-Full-Version-List https://s.magsrv.com;
           Sec-CH-UA-Full-Version https://s.magsrv.com;`}
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/icons/logo_192.png" />
        <link rel="icon" href="/icons/32.png" />
        <link rel="apple-touch-icon" href="/icons/logo_512.png" />
      </head>
      <body className={cn(inter.variable, 'overscroll-none')}>
        <ApolloWrapper apiGraphqlUrl={configService.NEXT_PUBLIC_API_GRAPHQL_URL} role={UserRoles.Fan}>
          <UserContextWrapper fan={fan}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <AgeConfirmation />
              <SidebarProvider>
                <div className="flex w-full min-h-screen overflow-hidden">
                  <AppSidebar />
                  <SidebarInset className="flex flex-1 flex-col min-h-screen">
                    <Toaster position="top-center" closeButton richColors theme="system" />
                    <EventsProvider />
                    <Sse />
                    <main className="flex-1 w-full overflow-x-hidden">{children}</main>
                  </SidebarInset>
                </div>
              </SidebarProvider>
              <CookieBanner />
            </ThemeProvider>
          </UserContextWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
