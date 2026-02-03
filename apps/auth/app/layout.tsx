import { AppConfig } from '@/lib/app.config';
import { configService } from '@/util/config';
import { Toaster } from '@workspace/ui/components/sonner';
import '@workspace/ui/globals.css';
import { cn } from '@workspace/ui/lib/utils';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--primary-font',
  style: 'normal'
});
export const viewport: Viewport = {
  themeColor: '#FFFFFF'
};

interface Props {
  v1: React.ReactNode;
  v2: React.ReactNode;
}

export default async function RootLayout({ v1, v2 }: Props) {
  const VERSION = configService.NEXT_PUBLIC_APP_VERSION;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="rating" content="RTA-5042-1996-1400-1577-RTA" />
        <meta name="classification" content="Adult" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={cn(inter.variable, 'overscroll-none')}>
        <Toaster position="top-center" richColors />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          value={{ light: 'light', dark: 'dark' }}
        >
          {VERSION === 'v1' ? v1 : v2}
        </ThemeProvider>
      </body>
    </html>
  );
}
