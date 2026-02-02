import { AppConfig } from '@/lib/app.config';
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
    keywords: AppConfig.keywords,
    icons: [
      { rel: 'apple-touch-icon', url: '/icons/logo_256.png' },
      { rel: 'icon', url: '/icons/logo_256.png' }
    ]
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
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
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
        <Toaster position="top-center" richColors />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          value={{ light: 'light', dark: 'dark' }}
        >
          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
