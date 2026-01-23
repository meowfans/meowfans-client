'use client';

import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ApplyHeaderOptions } from './ApplyHeaderOptions';

export const AppHeader = () => {
  const pathname = usePathname();

  return !pathname.startsWith('/channels') ? (
    <header
      className={`sticky top-0 z-50 border-b
        bg-linear-to-bl from-background
         to-(--background)/80 backdrop-blur-md
          px-4 py-2 flex flex-col w-full`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <ReturnToPreviousPage applyReturn />
          <Link href="/" className="shrink-0">
            <Image src="/icons/app_icon.svg" alt="Creator app logo" width={32} height={32} priority />
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <ApplyHeaderOptions />
        </div>
      </div>
    </header>
  ) : null;
};
