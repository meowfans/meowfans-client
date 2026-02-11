import { AppConfig } from '@/lib/app.config';
import { configService } from '@/util/config';
import { ApolloWrapper } from '@workspace/gql/ApolloWrapper';
import { Toaster } from '@workspace/ui/components/sonner';
import '@workspace/ui/globals.css';
import { cn } from '@workspace/ui/lib/utils';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';

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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--primary-font',
  style: 'normal'
});
export const viewport: Viewport = {
  themeColor: AppConfig.themeColor
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Delegate-CH" content={AppConfig.delegateCh} />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={cn(inter.variable, 'overscroll-none')}>
        <Toaster position="top-center" richColors />
        <ApolloWrapper apiGraphqlUrl={configService.NEXT_PUBLIC_API_GRAPHQL_URL}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            value={{ light: 'light', dark: 'dark' }}
          >
            {children}
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
