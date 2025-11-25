import { AppBottomNav } from '@/components/AppBottomNav';
import { AppSidebar } from '@/components/AppSideBar';
import { fetchRequest } from '@/hooks/api/useAPI';
import { CreatorContextWrapper } from '@/hooks/useCreator';
import { AppConfig } from '@/lib/app.config';
import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { ApolloWrapper } from '@workspace/gql/ApolloWrapper';
import { GET_CREATOR_PROFILE_QUERY } from '@workspace/gql/api/creatorAPI';
import { CreatorProfilesEntity } from '@workspace/gql/generated/graphql';
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar';
import '@workspace/ui/globals.css';
import { authCookieKey, FetchMethods, UserRoles } from '@workspace/ui/lib';
import { buildSafeUrl, decodeJwtToken } from '@workspace/ui/lib/helpers';
import { cn } from '@workspace/ui/lib/utils';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Toaster } from 'sonner';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const pathname = (await headerList).get('x-pathname') ?? '';

  const metadata = {
    metadataBase: new URL(AppConfig.siteUrl),
    title: {
      template: AppConfig.template,
      default: `${AppConfig.title} | ${pathname?.substring(1)}`
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

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--primary-font', style: 'normal' });
export const viewport: Viewport = {
  themeColor: '#FFFFFF'
};

interface Props {
  children: React.ReactNode;
}

const verifyAccessToken = async (token: string) => {
  const data = await fetchRequest({
    fetchMethod: FetchMethods.POST,
    pathName: '/auth/verify',
    init: {
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  });
  return data;
};

const getCreator = async () => {
  const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL);
  const client = await getClient();
  const { data } = await client.query({ query: GET_CREATOR_PROFILE_QUERY });
  const creatorProfile = data?.getCreatorProfile as CreatorProfilesEntity;
  return creatorProfile;
};

const handleValidate = async () => {
  const cookiesList = await cookies();
  const accessToken = cookiesList.get(authCookieKey)?.value;

  const decodedToken = decodeJwtToken(accessToken);

  if (decodedToken && !decodedToken.roles.includes(UserRoles.CREATOR)) {
    return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  }

  if (!accessToken) return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  try {
    await verifyAccessToken(accessToken);
  } catch {
    return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  }
  return await getCreator();
};

export default async function RootLayout({ children }: Props) {
  const creator = await handleValidate();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="rating" content="RTA-5042-1996-1400-1577-RTA" />
        <meta name="classification" content="Adult" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/icons/logo_192.png" />
        <link rel="icon" href="/icons/32.png" />
        <link rel="apple-touch-icon" href="/icons/logo_512.png" />
      </head>
      <body className={cn(inter.variable, 'overscroll-none')}>
        <ApolloWrapper apiGraphqlUrl={configService.NEXT_PUBLIC_API_GRAPHQL_URL}>
          <CreatorContextWrapper creator={creator}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              value={{ light: 'light', dark: 'dark' }}
            >
              <Toaster richColors position="top-center" closeButton theme={'system'} />
              <SidebarProvider>
                <div className="flex w-full min-h-screen overflow-hidden">
                  <AppSidebar />
                  <SidebarInset className="flex flex-1 flex-col min-h-screen">
                    <Toaster position="top-center" closeButton richColors theme="system" />
                    <main className="flex-1 w-full overflow-x-hidden">{children}</main>
                  </SidebarInset>
                </div>
              </SidebarProvider>
              <AppBottomNav />
            </ThemeProvider>
          </CreatorContextWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
