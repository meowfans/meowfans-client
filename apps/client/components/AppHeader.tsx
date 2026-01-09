'use client';
import { useZonesStore } from '@/hooks/store/zones.store';
import { legalAndAppPaths } from '@/lib/constants';
import { Icons } from '@/lib/icons/Icons';
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { CircleOff } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { AppHeaderSheet } from './AppHeaderSheet';
import { Credentials } from './Credentials';
import { ExoAdProvider, ExoAdZoneTypes } from './ExoAdProvider';
import { ExploreButton } from './ExploreButton';
import { LightHouse } from './LightHouse';
import AdFreeModal from './modals/AdFreeModal';
import { NavActions } from './NavActions';
import { SearchButton } from './SearchButton';
import { ZoneBadge } from './ZoneBadge';

const AppHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { setOpenZone, openZone } = useZonesStore();

  return (
    <header
      className={`sticky top-0 z-50 border-b
        bg-linear-to-bl from-background
         to-(--background)/80 backdrop-blur-md
          px-4 py-2 flex flex-col w-full`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-wrap w-full items-center justify-between gap-1">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 cursor-pointer
                 rounded-full hover:scale-105 transition-transform duration-200`}
              onClick={() => router.push('/')}
            >
              <ReturnToPreviousPage applyReturn />
              {Icons.appIcon()}
            </div>

            {/* {!legalAndAppPaths.includes(pathname) && <LightHouse variant={isMobile ? 'mobile' : 'desktop'} />} */}
            <div className="hidden md:flex w-5">
              <ExoAdProvider
                zoneId="5769736"
                classIdName="eas6a97888e10"
                zoneType={ExoAdZoneTypes.MobileBanner}
                className="flex w-5 scale-30"
              />
            </div>
          </div>
          {/* For desktop */}
          <div className="hidden md:flex items-center flex-row gap-3">
            <ZoneBadge />
            <ExploreButton />
            <TriggerModal
              onChangeModalState={() => setOpenZone(true)}
              modalIcon={{ icon: CircleOff, variant: 'outline', size: 'sm' }}
              modalText="Go ad free"
            />
            <Credentials />
          </div>
        </div>
        {/* For mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ZoneBadge />
          <SearchButton />
          <AppHeaderSheet />
          <NavActions />
        </div>
      </div>
      {openZone && <AdFreeModal />}
    </header>
  );
};

export default AppHeader;
