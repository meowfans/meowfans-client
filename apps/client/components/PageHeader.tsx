'use client';

import { DesktopBannerZoneIds, ExoAdProvider, ExoAdZoneTypes, OutstreamZoneIds } from './ExoAdProvider';

interface PageHeaderProps {
  title: string;
  zoneId?: DesktopBannerZoneIds;
  enableAd?: boolean;
  outstreamZoneId?: OutstreamZoneIds;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, zoneId = '5771518', enableAd = true, outstreamZoneId = '5771264' }) => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-xl font-semibold m-3">{title}</h2>
      <div className="relative overflow-hidden md:w-[calc(100vw-270px)] w-full space-y-1 gap-1">
        {enableAd && <ExoAdProvider zoneId={zoneId} />}
      </div>
      {enableAd && <ExoAdProvider zoneId={outstreamZoneId} zoneType={ExoAdZoneTypes.OutStream} />}
    </div>
  );
};
