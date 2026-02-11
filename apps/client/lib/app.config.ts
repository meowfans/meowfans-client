export const AppConfig = {
  // Brand & Identity
  applicationName: 'MeowFans',
  site_name: 'MeowFans',
  title: 'MeowFans — Verified & Compliant Creator Platform',
  description:
    'Manage your profile, view statistics, and stay updated with your favorite creators on MeowFans, the premier verified and compliant platform for fans and creators.',
  subDescription:
    'A secure, verified, and RTA-5042 compliant platform for creators and fans to connect and share exclusive content. Experience premium entertainment with full transparency and safety.',
  tagline: 'Verified & Compliant Platform for Creators & Fans',

  // SEO & Metadata
  keywords: [
    'MeowFans',
    'creator platform',
    'verified creators',
    'fan updates',
    'adult entertainment',
    'RTA compliant',
    'premium content',
    'content monetization',
    'exclusive content',
    'secure platform',
    'NSFW fans',
    'creator dashboard'
  ],
  siteUrl: 'https://meowfans.app',
  canonical: 'https://meowfans.app',
  locale: 'en_US',
  template: '%s | MeowFans',
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

  // Legal & Compliance
  legal: [
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Fan Terms', href: '/legal/fan-terms' },
    { label: 'Creator Terms', href: '/legal/creator-terms' },
    { label: 'General Terms', href: '/legal/general-terms' }
  ],

  // Contact & Support
  contact: {
    email: 'support@meowfans.app',
    supportUrl: '/support',
    address: 'Global Operations'
  },

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
