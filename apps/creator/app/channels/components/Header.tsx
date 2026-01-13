import { Button } from '@workspace/ui/components/button';
import { useSidebar } from '@workspace/ui/components/sidebar';
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const ChannelHeader = () => {
  const { setOpen, open } = useSidebar();
  return (
    <div
      className={`fixed top-0 left-0 md:left-(--sidebar-width)
        md:right-(--sidebar-width) right-0 flex flex-row items-center justify-between border-b
      bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 px-2 z-40 h-16`}
    >
      <div className="flex flex-row items-center gap-2">
        {!open && (
          <Button onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        )}
        <ReturnToPreviousPage />
        <Link href="/posts" className="shrink-0">
          <Image src="/icons/app_icon.svg" alt="Creator app logo" width={28} height={28} />
        </Link>
      </div>
    </div>
  );
};
