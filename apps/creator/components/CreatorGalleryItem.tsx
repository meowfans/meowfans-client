/* eslint-disable @next/next/no-img-element */
import { FileType } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { MEOW_FANS_BANNER } from '@workspace/ui/lib/constants';
import Link from 'next/link';
import React from 'react';

interface CreatorGalleryItemProps<T> {
  item: T;
  index: number;
  allItems: T[];
  getKey: (item: T) => string | number;
  getUrl: (item: T) => string | undefined;
  getFileType?: (item: T) => FileType;
  renderOverlay?: (item: T, index: number, allItems: T[]) => React.ReactNode;
  applyLink: boolean;
  basePath: string;
  onClick?: (item: T, e?: React.MouseEvent) => unknown;
  className?: string;
}

export const CreatorGalleryItem = <T,>({
  item,
  index,
  allItems,
  getKey,
  getUrl,
  getFileType,
  renderOverlay,
  applyLink,
  basePath,
  onClick,
  className
}: CreatorGalleryItemProps<T>) => {
  const key = getKey(item);
  const url = getUrl(item) ?? MEOW_FANS_BANNER;
  const isImage = getFileType?.(item) === FileType.Image;

  const content = (
    <>
      <Badge
        className="
          absolute z-20
          left-2 top-2
          px-2 py-0.5 text-[10px]
          sm:left-3 sm:top-3
          sm:px-2.5 sm:py-1 sm:text-xs
        "
      >
        #{index + 1}
      </Badge>

      {isImage ? (
        <div className="relative aspect-3/4 w-full overflow-hidden rounded-xs">
          <img src={url} alt={`asset_${key}`} className="h-full w-full object-cover" loading="lazy" />

          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-linear-to-t from-black/40 via-transparent
              opacity-0 hover:opacity-100
              transition-opacity
            "
          />
        </div>
      ) : (
        <video src={url} className="h-full w-full object-cover" muted controls />
      )}

      {renderOverlay && (
        <div
          className={`
            absolute inset-0 z-20
            ${isImage ? 'pointer-events-auto' : 'pointer-events-none'}
          `}
        >
          {renderOverlay(item, index, allItems)}
        </div>
      )}
    </>
  );

  return (
    <div className={`relative rounded-xl bg-card ${className ?? ''}`}>
      {applyLink ? (
        <Link href={`${basePath}/${key}`} onClick={(e) => onClick?.(item, e)} className="block h-full w-full">
          {content}
        </Link>
      ) : (
        <div onClick={(e) => onClick?.(item, e)} className="block h-full w-full">
          {content}
        </div>
      )}
    </div>
  );
};
