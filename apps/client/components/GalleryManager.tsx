'use client';

import Loading from '@/app/loading';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { handlePathName } from '@workspace/ui/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Masonry from 'react-masonry-css';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { ExoAdProvider, ExoAdZoneTypes, GalleryZoneIds, OutstreamZoneIds } from './ExoAdProvider';
import { NextImage } from './NextImage';
import { Badge } from '@workspace/ui/components/badge';

interface MasonryGridProps<T> {
  loading?: boolean;
  items: T[];
  getKey: (item: T) => string | number;
  getImageUrl: (item: T) => string | undefined;
  renderOverlay?: (item: T, index: number, allItems: T[]) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  applyLink?: boolean;
  pathname?: string;
  onClick?: (item: T) => unknown;
  zoneId?: GalleryZoneIds;
  breakpointCols?: { default: number; [key: number]: number };
}

export const GalleryManager = <T,>({
  loading,
  items,
  getKey,
  getImageUrl,
  renderOverlay,
  className,
  itemClassName,
  applyLink = false,
  pathname,
  onClick,
  zoneId = '5769738',
  breakpointCols = { default: 3, 768: 2, 500: 1 }
}: MasonryGridProps<T>) => {
  const pathName = usePathname();
  const getPath = () => (pathname ? pathname : handlePathName(pathName));

  const getOutStreamZone = (id: number, children: React.ReactElement | null) => {
    return (
      <div id={`ad_${id}`} style={{ width: '100%' }} className="!w-full absolute">
        {children}
      </div>
    );
  };

  const insertZones = [
    {
      pos: 0,
      zone: <ExoAdProvider zoneId="5771264" zoneType={ExoAdZoneTypes.OutStream} />
    },
    {
      pos: 10,
      zone: <ExoAdProvider zoneId="5771266" zoneType={ExoAdZoneTypes.OutStream} />
    },
    {
      pos: 20,
      zone: <ExoAdProvider zoneId="5771268" zoneType={ExoAdZoneTypes.OutStream} />
    },
    {
      pos: 30,
      zone: <ExoAdProvider zoneId="5771270" zoneType={ExoAdZoneTypes.OutStream} />
    }
  ];

  // for (let i = insertZones.length - 1; i >= 0; i--) {
  //   const { pos, zone } = insertZones[i];
  //   items.splice(pos, 0, zone as T);
  // }

  const getMergedItems = (items: T[]) => {
    const merged: T[] = [];
    const adPositions = [0, 10, 20, 30];

    items.forEach((item, index) => {
      merged.push(item);

      if (adPositions.includes(index)) {
        const adIndex = adPositions.indexOf(index);

        merged.push(
          (
            <div key={`ad-${index}`} className="w-full block">
              <ExoAdProvider
                zoneId={['5771264', '5771266', '5771268', '5771270'].map((id) => id as OutstreamZoneIds)[adIndex]}
                zoneType={ExoAdZoneTypes.OutStream}
              />
            </div>
          ) as T
        );
      }
    });

    return merged;
  };

  return (
    <div className="relative w-full overflow-hidden">
      <ScrollArea className="w-full mb-[100px] overflow-x-hidden">
        <ExoAdProvider zoneId={zoneId} zoneType={ExoAdZoneTypes.Gallery} />
        <Masonry
          breakpointCols={breakpointCols}
          className={`flex w-full gap-0.5 ${className ?? ''}`}
          columnClassName="flex flex-col gap-0.5"
        >
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <Loading />
            </div>
          ) : items.length ? (
            items.map((item, idx) => {
              if (React.isValidElement(item)) return item;
              return (
                <div key={getKey(item) ?? idx} className={`relative overflow-hidden ${itemClassName ?? ''}`}>
                  {applyLink ? (
                    <Link
                      href={`${getPath()}/${getKey(item)}`}
                      onClick={() => onClick?.(item)}
                      title="Take a look"
                      className="block relative w-full h-full overflow-hidden"
                    >
                      <Badge
                        className="absolute shadow-2xl shadow-accent-foreground
                      top-0 left-0 w-fit m-1 bg-gradient-to-r from-indigo-500
                      via-purple-500 to-pink-500 text-white z-20"
                      >
                        Click to view
                      </Badge>
                      <NextImage imageUrl={getImageUrl(item)} alt={`asset_${getKey(item)}`} />
                      {renderOverlay && <div className="absolute inset-0">{renderOverlay(item, idx, items)}</div>}
                    </Link>
                  ) : (
                    <div className="relative w-full h-full overflow-hidden">
                      <Badge className="absolute top-0 left-0 w-fit p-1">{idx + 1}</Badge>
                      <NextImage imageUrl={getImageUrl(item)} alt={`asset_${getKey(item)}`} />
                      {renderOverlay && <div className="absolute inset-0">{renderOverlay(item, idx, items)}</div>}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="w-full flex justify-center items-center">
              <EmptyElement />
            </div>
          )}
        </Masonry>
      </ScrollArea>
    </div>
  );
};
