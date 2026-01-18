'use client';

import { Icons } from '@/lib/icons/Icons';
import { Button } from '@workspace/ui/components/button';
import { useSidebar } from '@workspace/ui/components/sidebar';
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { cn } from '@workspace/ui/lib/utils';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ApplyHeaderOptions } from './ApplyHeaderOptions';

export const AppHeader = () => {
  const isMobile = useIsMobile();
  const { open, setOpen, state } = useSidebar();
  const pathname = usePathname();

  if (pathname.startsWith('/channels')) return null;

  return (
    <div
      className={cn(
        'flex flex-row justify-between border-b bg-linear-to-bl px-2 h-16 bg-background z-40 fixed top-0 right-0 transition-[left] duration-200 ease-linear'
      )}
      style={{
        left: isMobile ? '0' : state === 'expanded' ? 'var(--sidebar-width)' : 'var(--sidebar-width-icon)'
      }}
    >
      <div className="flex flex-row items-center gap-2">
        {!open && !isMobile && (
          <Button onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        )}
        <ReturnToPreviousPage applyReturn />
        <div className="cursor-pointer ">{Icons.appIcon()}</div>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <ApplyHeaderOptions />
      </div>
    </div>
  );
};
