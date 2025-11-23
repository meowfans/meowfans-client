'use client';
import { AppConfig } from '@/lib/app.config';
import moment from 'moment';

export default function Footer() {
  return (
    <footer className="relative z-50 w-full bg-neutral-900 text-gray-400 text-sm p-6 mt-12 border-t border-neutral-800">
      <div className="max-w-5xl mx-auto space-y-3 text-center">
        <p>
          © {moment(new Date().getFullYear()).format('L')} {AppConfig.site_name}. All rights reserved.
        </p>
        <p>
          All models appearing on this website are 18 years of age or older. Compliance with 18 U.S.C. 2257 Record-Keeping Requirements is
          maintained.
        </p>
        <p>
          <a href="/terms" className="hover:text-white cursor-pointer underline mx-1">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:text-white cursor-pointer underline mx-1">
            Privacy Policy
          </a>
          <a href="/2257" className="hover:text-white cursor-pointer underline mx-1">
            2257 Compliance
          </a>
        </p>
        <p className="text-xs text-gray-500">Viewer discretion advised. This site is intended for adults only.</p>
      </div>
    </footer>
  );
}
