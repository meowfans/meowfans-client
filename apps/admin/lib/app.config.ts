export const AppConfig = {
  // Brand & Identity
  applicationName: 'MeowFans',
  site_name: 'MeowFans',
  title: 'MeowFans Admin — System Management Dashboard',
  description: 'Internal administration dashboard for MeowFans platform management and creator oversight.',
  subDescription: 'Secure administrative access to MeowFans platform analytics, user management, and compliance tools.',
  tagline: 'Platform Administration & Oversight',

  // SEO & Metadata
  keywords: ['MeowFans Admin', 'platform management', 'administration dashboard', 'creator oversight'],
  siteUrl: 'https://meowfans.app/admin',
  canonical: 'https://meowfans.app/admin',
  locale: 'en_US',
  template: '%s | MeowFans Admin',
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
