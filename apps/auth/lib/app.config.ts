export const AppConfig = {
  // Brand & Identity
  applicationName: 'MeowFans',
  site_name: 'MeowFans',
  title: 'MeowFans Auth — Secure Access for Fans & Creators',
  description: 'Log in or sign up to MeowFans to connect with your favorite creators and access exclusive content.',
  subDescription: 'Secure authentication for the MeowFans platform. Your gateway to verified content and creator interactions.',
  tagline: 'Secure Access to MeowFans',

  // SEO & Metadata
  keywords: ['MeowFans Login', 'MeowFans Signup', 'Creator Authentication', 'Secure Access'],
  siteUrl: 'https://meowfans.app/auth',
  canonical: 'https://meowfans.app/auth',
  locale: 'en_US',
  template: '%s | MeowFans Authentication',
  type: 'website' as const,
  themeColor: '#000000',

  // Assets & Branding
  images: {
    og: 'https://meowfans.app/opengraph-image',
    logo: '/logo.png',
    favicon: '/favicon.ico'
  },
  manifest: '/site.webmanifest',
  icons: [
    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icons/icon-180.png', sizes: '180x180', type: 'image/png' }
  ],

  // RTA Compliance
  rta: {
    rating: 'RTA-5042-1996-1400-1577-RTA',
    classification: 'Adult'
  },

  // Verification & Security
  verification: {
    site: 'ac2d60d2db24c5a92f5d5c0f5e5ce6a7'
  },

  // Custom Headers (e.g., for Magsrv)
  delegateCh: `Sec-CH-UA https://s.magsrv.com;
           Sec-CH-UA-Mobile https://s.magsrv.com;
           Sec-CH-UA-Arch https://s.magsrv.com;
           Sec-CH-UA-Model https://s.magsrv.com;
           Sec-CH-UA-Platform https://s.magsrv.com;
           Sec-CH-UA-Platform-Version https://s.magsrv.com;
           Sec-CH-UA-Bitness https://s.magsrv.com;
           Sec-CH-UA-Full-Version-List https://s.magsrv.com;
           Sec-CH-UA-Full-Version https://s.magsrv.com;`
};
