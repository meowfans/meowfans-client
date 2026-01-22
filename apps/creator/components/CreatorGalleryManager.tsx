'use client';

import { FileType } from '@workspace/gql/generated/graphql';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { handlePathName } from '@workspace/ui/lib';
import { usePathname } from 'next/navigation';
import React from 'react';
import { CreatorGalleryItem } from './CreatorGalleryItem';

interface CreatorGalleryGridProps<T> {
  loading?: boolean;
  items: T[];
  getKey: (item: T) => string | number;
  getUrl: (item: T) => string | undefined;
  getFileType?: (item: T) => FileType;
  renderOverlay?: (item: T, index: number, allItems: T[]) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  applyLink?: boolean;
  pathname?: string;
  onClick?: (item: T, e?: React.MouseEvent) => unknown;
}

export const CreatorGalleryManager = <T,>({
  loading,
  items,
  getKey,
  getUrl,
  getFileType,
  renderOverlay,
  className,
  itemClassName,
  applyLink = false,
  pathname,
  onClick
}: CreatorGalleryGridProps<T>) => {
  const currentPath = usePathname();
  const basePath = pathname ?? handlePathName(currentPath);

  return (
    <ScrollArea className="w-full pb-24">
      {loading ? (
        <div className="flex min-h-80 items-center justify-center">Loading...</div>
      ) : items.length ? (
        <div className={`grid md:grid-cols-6 grid-cols-3 gap-1${className ?? ''}`}>
          {items.map((item, index) => (
            <CreatorGalleryItem
              key={getKey(item)}
              item={item}
              index={index}
              getKey={getKey}
              getUrl={getUrl}
              getFileType={getFileType}
              renderOverlay={renderOverlay}
              applyLink={applyLink}
              basePath={basePath}
              onClick={onClick}
              className={itemClassName}
              allItems={items}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-80 items-center justify-center">
          <EmptyElement />
        </div>
      )}
    </ScrollArea>
  );
};
