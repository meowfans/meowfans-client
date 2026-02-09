'use client';

import { ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function RTAFooter() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Fan Terms', href: '/legal/fan-terms' },
    { label: 'Creator Terms', href: '/legal/creator-terms' },
    { label: '2257 Compliance', href: '/legal/2257' },
    { label: 'General Terms', href: '/legal/general-terms' }
  ];

  return (
    <footer className="w-full bg-background border-t border-white/5 py-12 px-6 mt-auto pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section: RTA Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mx-auto md:mx-0">
              <ShieldAlert className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">RTA Restricted</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-tight">Parental Control & Compliance</h3>
              <p className="text-muted-foreground text-[11px] md:text-xs uppercase tracking-widest leading-relaxed">
                MeowFans is restricted to adults aged 18 and older. We are RTA (Restricted to Adults) compliant. Our platform uses
                sophisticated age verification and content monitoring to ensure a safe environment for creators and fans.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <a href="https://www.rtalabel.org/" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="h-24 w-52 rounded-[2rem] bg-secondary/20 border border-white/10 flex items-center justify-center p-6 hover:bg-secondary/30 transition-all duration-300 group-hover:border-primary/50 relative overflow-hidden backdrop-blur-sm shadow-xl shadow-black/20">
                <Image
                  src="/120x60_RTA-5042-1996-1400-1577-RTA_d.gif"
                  alt="RTA Restricted to Adults"
                  width={120}
                  height={60}
                  className="h-full w-auto filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 object-contain scale-110 group-hover:scale-125"
                />
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 mt-4 text-center group-hover:text-primary transition-colors">
                Verified Compliance
              </p>
            </a>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-6 pt-12 border-t border-white/5">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all hover:translate-x-1 md:hover:translate-x-0 md:hover:-translate-y-1 inline-block"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/20">
            ©2025-{currentYear} MeowFans. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <span className="hidden md:block h-1.5 w-1.5 rounded-full bg-primary/20" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/20 italic">
              Platform for Creators & Fans
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
