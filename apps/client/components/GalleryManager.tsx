'use client';

import Loading from '@/app/loading';
import { Badge } from '@workspace/ui/components/badge';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { MultipleObjectsIcon } from '@workspace/ui/globals/MultipleObjectsIcon';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { handlePathName, MEOW_FANS_BANNER } from '@workspace/ui/lib';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Masonry from 'react-masonry-css';
import { ExoAdProvider, ExoAdZoneTypes, GalleryZoneIds } from './ExoAdProvider';
import { NextImage } from './NextImage';

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
  layout?: 'masonry' | 'grid';
  getObjectsLength?: (item: T) => number;
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
  getObjectsLength,
  zoneId = '5769738',
  breakpointCols = { default: 3, 768: 2, 500: 1 },
  layout = 'masonry'
}: MasonryGridProps<T>) => {
  const pathName = usePathname();
  const getPath = () => (pathname ? pathname : handlePathName(pathName));
  const isGrid = layout === 'grid';
  const isMobile = useIsMobile();
  const renderOptionsOnMobile = isGrid && isMobile;

  const renderItem = (item: T, idx: number) => {
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
            {/* {!renderOptionsOnMobile && ( */}
            <div className="absolute top-0 left-0 z-20 m-1">
              <MultipleObjectsIcon hasMultiple={(getObjectsLength?.(item) ?? 0) > 1} />
            </div>

            {isGrid ? (
              <Image
                src={getImageUrl(item) ?? MEOW_FANS_BANNER}
                alt={`asset_${getKey(item)}`}
                className="h-full w-full object-cover"
                loading="lazy"
                width={300}
                height={400}
                unoptimized={true}
              />
            ) : (
              <NextImage imageUrl={getImageUrl(item)} alt={`asset_${getKey(item)}`} />
            )}

            {!renderOptionsOnMobile && renderOverlay && <div className="absolute inset-0">{renderOverlay(item, idx, items)}</div>}
          </Link>
        ) : (
          <>
            <Badge className="absolute top-0 left-0 z-20 m-1">{idx + 1}</Badge>

            {isGrid ? (
              <Image
                src={getImageUrl(item) ?? MEOW_FANS_BANNER}
                alt={`asset_${getKey(item)}`}
                className="h-full w-full object-cover"
                loading="lazy"
                width={300}
                height={100}
                unoptimized={true}
              />
            ) : (
              <Image
                src={getImageUrl(item) ?? MEOW_FANS_BANNER}
                alt={`asset_${getKey(item)}`}
                className="h-full w-full object-cover justify-center"
                loading="lazy"
                width={300}
                height={100}
                unoptimized={true}
              />
            )}

            {!renderOptionsOnMobile && renderOverlay && <div className="absolute inset-0">{renderOverlay(item, idx, items)}</div>}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <ScrollArea className="w-full overflow-x-hidden">
        <ExoAdProvider zoneId={zoneId} zoneType={ExoAdZoneTypes.Gallery} />

        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Loading />
          </div>
        ) : items.length ? (
          isGrid ? (
            <div className={`grid grid-cols-3 gap-0.5 ${className ?? ''}`}>{items.map(renderItem)}</div>
          ) : (
            <Masonry
              breakpointCols={breakpointCols}
              className={`flex w-full gap-0.5 ${className ?? ''}`}
              columnClassName="flex flex-col gap-0.5"
            >
              {items.map(renderItem)}
            </Masonry>
          )
        ) : (
          <div className="w-full flex justify-center items-center">
            <EmptyElement />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
