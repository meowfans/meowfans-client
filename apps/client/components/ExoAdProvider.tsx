'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { configService } from '@/util/config';
import { useEffect } from 'react';

export enum ExoAdZoneTypes {
  Gallery = 'Gallery',
  MobileBanner = 'MobileBanner',
  OutStream = 'Outstream',
  MobilePost = 'MobilePost',
  StickyBanner = 'StickyBanner',
  SlideVideo = 'SlideVideo',
  DesktopBanner = 'DesktopBanner',
  Default = 'Default'
}

export type GalleryZoneIds =
  | '5769738'
  | '5769740'
  | '5770610'
  | '5770612'
  | '5770614'
  | '5770874'
  | '5770876'
  | '5770878'
  | '5770880'
  | '5770882';

export type OutstreamZoneIds =
  | '5771264'
  | '5771266'
  | '5771268'
  | '5771270'
  | '5771272'
  | '5771274'
  | '5771276'
  | '5771278'
  | '5771280'
  | '5771282'
  | '5771286';

export type MobilePostZoneIds = '5770578';

export type MobileHeaderZoneIds = '5771432';

export type StickyBannerZoneIds = '5770830';

export type DesktopBannerZoneIds = '5771518' | '5772066' | '5772068' | '5772070' | '5772072';

export type SlideVideoZoneIds = '5771480' | '5771496' | '5771498' | '5771500' | '5771502' | '5771504' | '5771506' | '5771508' | '5771510';

export type MobileZoneIds =
  | '5770582'
  | '5769736'
  | '5770664'
  | '5771438'
  | '5771440'
  | '5771442'
  | '5771444'
  | '5771446'
  | '5771448'
  | '5771450'
  | '5771452'
  | '5771454';

type ZoneIdMap = {
  [ExoAdZoneTypes.Gallery]: GalleryZoneIds;
  [ExoAdZoneTypes.MobileBanner]: MobileZoneIds;
  [ExoAdZoneTypes.OutStream]: OutstreamZoneIds;
  [ExoAdZoneTypes.MobilePost]: MobilePostZoneIds;
  [ExoAdZoneTypes.StickyBanner]: StickyBannerZoneIds;
  [ExoAdZoneTypes.SlideVideo]: SlideVideoZoneIds;
  [ExoAdZoneTypes.DesktopBanner]: DesktopBannerZoneIds;
  [ExoAdZoneTypes.Default]:
    | GalleryZoneIds
    | OutstreamZoneIds
    | MobileZoneIds
    | MobilePostZoneIds
    | StickyBannerZoneIds
    | SlideVideoZoneIds
    | DesktopBannerZoneIds
    | MobileHeaderZoneIds;
};

interface ExoClickAdProviderProps<TZone extends ExoAdZoneTypes> {
  zoneId: ZoneIdMap[TZone];
  zoneType?: TZone;
  classIdName?: string;
  className?: string;
}

export const ExoAdProvider = <TZone extends ExoAdZoneTypes>({
  zoneId,
  zoneType = ExoAdZoneTypes.Default as TZone,
  classIdName,
  className
}: ExoClickAdProviderProps<TZone>) => {
  const { fan } = useFan();
  const hasSubscribed = () => {
    switch (configService.NEXT_PUBLIC_NODE_ENV) {
      case 'dev_production':
      case 'development':
        return true;
      default:
        return !!fan?.hasZoneMembership;
    }
  };

  useEffect(() => {
    if (hasSubscribed()) return;
    const existing = document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://a.magsrv.com/ad-provider.js';
      script.type = 'application/javascript';
      script.async = true;
      document.head.appendChild(script);
    }

    const adContainer = document.getElementById(`exo-zone-${zoneId}`);
    if (adContainer) {
      const newAdContainer = document.createElement('ins');
      newAdContainer.className = classIdName || 'eas6a97888e2';
      newAdContainer.setAttribute('data-zoneid', zoneId);
      adContainer.appendChild(newAdContainer);
    }

    (window as any).AdProvider = (window as any).AdProvider || [];
    (window as any).AdProvider.push({ serve: {} });

    return () => {
      if (adContainer) adContainer.innerHTML = '';
    };
  }, [zoneId, classIdName, hasSubscribed]);

  return hasSubscribed()
    ? null
    : (() => {
        switch (zoneType) {
          case ExoAdZoneTypes.Gallery:
            return (
              <div className="flex flex-col w-full">
                <div className="relative overflow-hidden md:w-[calc(100vw-265px)] p-0 m-0 w-full space-y-1 ">
                  <div id={`exo-zone-${zoneId}`} className={className || ''} />
                </div>
              </div>
            );

          case ExoAdZoneTypes.MobileBanner:
            return (
              <div className="flex flex-col items-center justify-center w-full">
                <div id={`exo-zone-${zoneId}`} className={className || 'border-[0.5px] border-black'} />
              </div>
            );

          case ExoAdZoneTypes.OutStream:
            return <div id={`exo-zone-${zoneId}`} className={className || ''} />;

          case ExoAdZoneTypes.MobilePost:
            return <div id={`exo-zone-${zoneId}`} className={`${className}` || ''} />;

          case ExoAdZoneTypes.StickyBanner:
            return <div id={`exo-zone-${zoneId}`} className={`${className}` || ''} />;

          case ExoAdZoneTypes.SlideVideo:
            return <div id={`exo-zone-${zoneId}`} className={`${className}` || ''} />;

          case ExoAdZoneTypes.Default:
            return <div id={`exo-zone-${zoneId}`} className={`${className}` || ''} />;

          default:
            return <div id={`exo-zone-${zoneId}`} className={className || ''} />;
        }
      })();
};
