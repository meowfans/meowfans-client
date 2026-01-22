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
      <Badge className="absolute left-3 top-3 z-20">#{index + 1}</Badge>
      {isImage ? (
        <div className="relative aspect-3/4 w-full overflow-hidden rounded-xs">
          <img src={url} alt={`asset_${key}`} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent opacity-0 hover:opacity-100 transition-opacity" />
        </div>
      ) : (
        <video src={url} className="h-full w-full object-cover" muted controls />
      )}

      {renderOverlay && <div className="absolute inset-0 z-20">{renderOverlay(item, index, allItems)}</div>}
    </>
  );

  return (
    <div className={`relative rounded-xl bg-card${className ?? ''}`}>
      {applyLink ? (
        <Link href={`${basePath}/${key}`} onClick={(e) => onClick?.(item, e)} className="block w-full h-full">
          {content}
        </Link>
      ) : (
        <div onClick={(e) => onClick?.(item, e)} className="block w-full h-full">
          {content}
        </div>
      )}
    </div>
  );
};
