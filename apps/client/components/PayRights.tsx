'use client';

import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

const PayRights = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 w-full py-8 md:mb-0 mb-12 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        <div className="flex flex-col space-y-2 md:space-y-0">
          <p className="text-sm">© {new Date().getFullYear()} PayView. All rights reserved.</p>
          <p className="text-xs text-gray-400 max-w-xs">
            PayView respects all copyright laws. Content uploaded without authorization may be reported under the DMCA. We act in compliance
            with copyright regulations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
          <Link href="/terms" className="hover:text-white text-sm">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-white text-sm">
            Privacy Policy
          </Link>
          <Link href="/2257" className="hover:text-white text-sm">
            DMCA Notice
          </Link>
          <Link href="/faq" className="hover:text-white text-sm">
            FAQ
          </Link>
        </div>

        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="hover:text-white cursor-pointer" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="hover:text-white cursor-pointer" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="hover:text-white cursor-pointer" />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>
          All users are responsible for their actions. Unauthorized use of copyrighted material may result in account suspension. PayView is
          not liable for user-generated content.
        </p>
      </div>
    </footer>
  );
};

export default PayRights;
