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
    <div
      className={`fixed z-50 top-0 left-0 bg-[var(--background)] ${open && 'md:left-64'} ${
        _pathname === '/channels' ? 'right-64' : 'right-0'
      } flex flex-row items-center justify-between border-b bg-gradient-to-bl px-2  h-16`}
    >
      <div className="flex flex-row items-center gap-2">
        <ReturnToPreviousPage />
        <div className="cursor-pointer ">{Icons.appIcon()}</div>
        <p className="font-semibold text-xl animate-pulse">{header}</p>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <ApplyHeaderOptions />
      </div>
    </div>
  );
};
