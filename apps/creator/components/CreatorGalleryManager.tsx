'use client';

import Loading from '@/app/loading';
import { Badge } from '@workspace/ui/components/badge';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { handlePathName } from '@workspace/ui/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Masonry from 'react-masonry-css';
import { CreatorNextImage } from './CreatorNextImage';

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
  breakpointCols?: { default: number; [key: number]: number };
}

export const CreatorGalleryManager = <T,>({
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
  breakpointCols = { default: 3, 768: 2, 500: 1 }
}: MasonryGridProps<T>) => {
  const pathName = usePathname();
  const getPath = () => (pathname ? pathname : handlePathName(pathName));

  return (
    <div className="relative w-full overflow-hidden">
      <ScrollArea className="w-full mb-[100px] overflow-x-hidden">
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
                      <CreatorNextImage imageUrl={getImageUrl(item)} alt={`asset_${getKey(item)}`} />
                      {renderOverlay && <div className="absolute inset-0">{renderOverlay(item, idx, items)}</div>}
                    </Link>
                  ) : (
                    <div className="relative w-full h-full overflow-hidden">
                      <Badge className="absolute top-0 left-0 w-fit p-1">{idx + 1}</Badge>
                      <CreatorNextImage imageUrl={getImageUrl(item)} alt={`asset_${getKey(item)}`} />
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
