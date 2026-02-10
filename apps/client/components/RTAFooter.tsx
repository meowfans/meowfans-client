'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function RTAFooter() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const legalLinks = [
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Fan Terms', href: '/legal/fan-terms' },
    { label: 'Creator Terms', href: '/legal/creator-terms' },
    { label: '2257 Compliance', href: '/legal/2257' },
    { label: 'General Terms', href: '/legal/general-terms' }
  ];

  if (['channels', 'shorts'].includes(pathname.split('/')[1])) return null;

  return (
    <footer className="w-full bg-background border-t border-white/5 py-1 md:py-2 px-4 md:px-6 pb-20 md:pb-2 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Left: RTA & Tagline */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="px-1.5 py-0.5 rounded-[3px] bg-primary/10 border border-primary/20 shrink-0">
              <span className="text-[7px] md:text-[9px] font-black text-primary leading-none">RTA</span>
            </div>
            <div className="flex items-center opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <Image src="/RTA88.gif" alt="RTA 88" width={44} height={22} className="h-4 md:h-5 w-auto" />
            </div>
          </div>
          <p className="text-[7px] md:text-[9px] font-black uppercase tracking-tighter md:tracking-widest text-muted-foreground/30">
            Verified & Compliant <span className="hidden sm:inline">Platform for Creators & Fans</span>
          </p>
        </div>

        {/* Center: Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[7px] md:text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Copyright & Security */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-1.5 opacity-20 hover:opacity-100 transition-opacity">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <span className="text-[7px] md:text-[8px] font-black uppercase italic tracking-widest text-muted-foreground">Secure</span>
          </div>
          <p className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground/10">©{currentYear} MeowFans</p>
        </div>
      </div>
    </footer>
  );
}
