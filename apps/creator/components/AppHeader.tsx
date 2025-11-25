'use client';

import { Icons } from '@/lib/icons/Icons';
import { useSidebar } from '@workspace/ui/components/sidebar';
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { useParams, usePathname } from 'next/navigation';
import { ApplyHeaderOptions } from './ApplyHeaderOptions';

interface Props {
  header?: string;
}
export const AppHeader: React.FC<Props> = ({ header }) => {
  const { open } = useSidebar();
  const pathname = usePathname();
  const { id: channelId } = useParams();

  const _pathname = pathname === `/channels/${channelId}` ? '/channels' : pathname;

  return (
    <header
      className={`sticky top-0 z-50 border-b
        bg-gradient-to-bl from-[var(--background)]
         to-[var(--background)]/80 backdrop-blur-md
          px-4 py-2 flex flex-col w-full`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <ReturnToPreviousPage />
          <div className="cursor-pointer ">{Icons.appIcon()}</div>
          <p className="font-semibold text-xl animate-pulse">{header}</p>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <ApplyHeaderOptions />
        </div>
      </div>
    </header>
  );
};
