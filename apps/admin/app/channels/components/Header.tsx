import { Icons } from '@/lib/icons/Icons';
import { Button } from '@workspace/ui/components/button';
import { useSidebar } from '@workspace/ui/components/sidebar';
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { Menu } from 'lucide-react';

export const ChannelHeader = () => {
  const { setOpen, open } = useSidebar();
  return (
    <div className="fixed top-0 left-0 md:left-[var(--sidebar-width)] md:right-[var(--sidebar-width)] right-0 flex flex-row bg-white dark:bg-black items-center justify-between border-b bg-gradient-to-bl px-2 z-40 h-16">
      <div className="flex flex-row items-center gap-2">
        {!open && (
          <Button onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        )}
        <ReturnToPreviousPage />
        <div className="cursor-pointer">{Icons.appIcon()}</div>
      </div>
    </div>
  );
};
