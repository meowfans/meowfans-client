'use client';

import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { useBackground } from '@workspace/ui/hooks/useBackground';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ApplyHeaderOptions } from './ApplyHeaderOptions';

interface Props {
  header?: string;
}
export const AppHeader: React.FC<Props> = ({ header }) => {
  const pathname = usePathname();
  const { bgColor } = useBackground();

  return !pathname.startsWith('/channels') ? (
    <header
      className={`${bgColor} sticky top-0 z-40 border-b
        bg-linear-to-bl from-background
         to-(--background)/80 backdrop-blur-md
          px-4 py-2 flex flex-col w-full`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <ReturnToPreviousPage applyReturn />
          <Link href="/posts" className="shrink-0">
            <Image src="/icons/app_icon.svg" alt="Creator app logo" width={32} height={32} priority />
          </Link>
          <p className="font-semibold text-xl animate-pulse">{header}</p>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <ApplyHeaderOptions />
        </div>
      </div>
    </header>
  ) : null;
};
