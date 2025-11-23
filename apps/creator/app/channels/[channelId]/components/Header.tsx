import { Button } from '@workspace/ui/components/button';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { ArrowBigLeftDash, GalleryVerticalEnd, Menu, VolumeOff } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export const MessageHeader = () => {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 md:left-[var(--sidebar-width)] md:right-[var(--sidebar-width)]  right-0 flex flex-row bg-white dark:bg-black items-center justify-between border-b bg-gradient-to-bl px-2 z-40 h-16">
      <div className="flex flex-row justify-between space-x-3 items-center">
        <Button variant={'outline'} size={'lg'} onClick={() => router.back()}>
          <ArrowBigLeftDash />
        </Button>
        <div className="cursor-pointer">
          <SAvatar />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{'Meow User'}</p>
          <p className="font-semibold text-xs">{moment(new Date()).format('hh:mm')}</p>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <div className="hidden md:flex">
          <ApplyTheme />
        </div>
        <div className="flex items-center gap-2">
          <Button className="hidden md:inline-flex">
            <GalleryVerticalEnd />
          </Button>
          <Button className="hidden md:inline-flex">
            <VolumeOff />
          </Button>
          <Button className="md:hidden inline-flex">
            <Menu />
          </Button>
        </div>
      </div>
    </div>
  );
};
