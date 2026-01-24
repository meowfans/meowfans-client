'use client';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useZonesStore } from '@/hooks/store/zones.store';
import { Button } from '@workspace/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@workspace/ui/components/sheet';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { CircleOff } from 'lucide-react';
import { ExoAdProvider, ExoAdZoneTypes } from './ExoAdProvider';
import { ExploreButton } from './ExploreButton';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { LogoutModal } from './modals/LogoutModal';
import { SignUpButton } from './SignUpButton';

export const AppHeaderSheet = () => {
  const { fan } = useFan();
  const { setOpenZone } = useZonesStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {fan ? <SAvatar url={fan?.user.avatarUrl} className="border-green-400 border" /> : <Button variant="outline">Login</Button>}
      </SheetTrigger>
      <SheetContent side="right" className="w-64 sm:w-80 bg-linear-to-bl from-white to-slate-100 dark:from-black dark:to-neutral-900">
        <SheetHeader className="flex flex-row items-center border-b">
          <ApplyTheme />
          <SheetTitle>MeowFans</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-center gap-3 w-full py-4">
          <ExploreButton className="w-full shadow-accent" />
          <TriggerModal
            onChangeModalState={setOpenZone}
            modalIcon={{ icon: CircleOff, variant: 'outline' }}
            modalText="Go ad free"
            className="w-full shadow-accent"
            wrapperClassName="w-full"
          />

          {fan ? (
            <LogoutButton className="w-full" />
          ) : (
            <div className="flex flex-row justify-between w-full">
              <LoginButton />
              <SignUpButton />
            </div>
          )}

          <div className="flex justify-center items-center max-w-62.5 mt-3">
            <ExoAdProvider
              zoneId="5770578"
              zoneType={ExoAdZoneTypes.Default}
              classIdName="eas6a97888e10"
              className="flex justify-center items-center w-62.5 scale-80"
            />
          </div>
          <div className="hidden md:flex w-5">
            <ExoAdProvider zoneId="5769736" classIdName="eas6a97888e10" zoneType={ExoAdZoneTypes.Default} className="flex w-5 scale-30" />
          </div>
        </div>
        <LogoutModal />
      </SheetContent>
    </Sheet>
  );
};
