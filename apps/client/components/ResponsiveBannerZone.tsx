'use client';

import { usePathname } from 'next/navigation';
import { DesktopBannerZoneIds, ExoAdProvider, ExoAdZoneTypes, MobileZoneIds } from './ExoAdProvider';

interface ResponsiveBannerZoneProps {
  deskBanZoneId?: DesktopBannerZoneIds;
  mobBanZoneId?: MobileZoneIds;
}

export const ResponsiveBannerZone = ({ deskBanZoneId = '5771518', mobBanZoneId = '5769736' }: ResponsiveBannerZoneProps) => {
  const pathname = usePathname();
  if (pathname.startsWith('/channels')) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="hidden md:block">
        <ExoAdProvider zoneId={deskBanZoneId as DesktopBannerZoneIds} zoneType={ExoAdZoneTypes.DesktopBanner} />
      </div>
      <div className="block md:hidden">
        <ExoAdProvider zoneId={mobBanZoneId as MobileZoneIds} zoneType={ExoAdZoneTypes.MobileBanner} />
      </div>
    </div>
  );
};
