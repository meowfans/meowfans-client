'use client';

import Loading from '@/app/@v1/loading';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import React from 'react';
import { ExoAdProvider, ExoAdZoneTypes, GalleryZoneIds } from './ExoAdProvider';
import { NextImage } from './NextImage';

interface VerticalFeedGalleryProps<T> {
  loading?: boolean;
  items: T[];
  getKey: (item: T) => string | number;
  getImageUrl: (item: T) => string | undefined;
  renderOverlay?: (item: T, index: number, allItems: T[]) => React.ReactNode;
  className?: string;
  zoneId?: GalleryZoneIds;
}

export const VerticalFeedGallery = <T,>({
  loading,
  items,
  getKey,
  getImageUrl,
  renderOverlay,
  className,
  zoneId = '5769738'
}: VerticalFeedGalleryProps<T>) => {
  return (
    <div className={`relative w-full flex flex-col gap-1${className ?? ''}`}>
      <ExoAdProvider zoneId={zoneId} zoneType={ExoAdZoneTypes.Gallery} />

      {loading ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : items.length ? (
        items.map((item, idx) => (
          <div key={getKey(item)} className="relative w-full overflow-hidden bg-background">
            <NextImage imageUrl={getImageUrl(item)} />
            {renderOverlay && <div className="absolute inset-0 z-20">{renderOverlay(item, idx, items)}</div>}
          </div>
        ))
      ) : (
        <div className="min-h-[60vh] flex items-center justify-center">
          <EmptyElement />
        </div>
      )}
    </div>
  );
};
