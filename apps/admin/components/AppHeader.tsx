'use client';

import { Icons } from '@/lib/icons/Icons';
import { Button } from '@workspace/ui/components/button';
import { useSidebar } from '@workspace/ui/components/sidebar';
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { cn } from '@workspace/ui/lib/utils';
import { Menu } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { ApplyHeaderOptions } from './ApplyHeaderOptions';

interface Props {
  header?: string;
}
export const AppHeader: React.FC<Props> = ({ header }) => {
  const isMobile = useIsMobile();
  const { open, setOpen } = useSidebar();
  const pathname = usePathname();
  const { id: channelId } = useParams();

  const _pathname = pathname === `/channels/${channelId}` ? '/channels' : pathname;

  if (_pathname === '/channels') return null;

  return (
    <div
      className={cn('flex flex-row w-full justify-between border-b bg-linear-to-bl px-2 h-16 bg-background z-50 sticky top-0')}
    >
      <div className="flex flex-row items-center gap-2">
        {!open && !isMobile && (
          <Button onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        )}
        <ReturnToPreviousPage applyReturn />
        <div className="cursor-pointer ">{Icons.appIcon()}</div>
        <p className="font-semibold text-xl animate-pulse">{header}</p>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <ApplyHeaderOptions />
      </div>
    </div>
  );
};
