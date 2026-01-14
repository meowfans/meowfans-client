'use client';

import Loading from '@/app/loading';
import { Badge } from '@workspace/ui/components/badge';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { handlePathName } from '@workspace/ui/lib';
import { motion } from 'framer-motion';
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
  onClick?: (item: T, e?: React.MouseEvent) => unknown;
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
      <ScrollArea className="w-full mb-25 overflow-x-hidden">
        <Masonry breakpointCols={breakpointCols} className={`flex w-full gap-2 ${className ?? ''}`} columnClassName="flex flex-col gap-2">
          {loading ? (
            <div className="w-full flex justify-center items-center min-h-100">Loading</div>
          ) : items.length ? (
            items.map((item, idx) => {
              if (React.isValidElement(item)) return item;
              return (
                <motion.div
                  key={getKey(item) ?? idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-card ${itemClassName ?? ''}`}
                >
                  {applyLink ? (
                    <Link
                      href={`${getPath()}/${getKey(item)}`}
                      onClick={(e) => onClick?.(item, e)}
                      title="Take a look"
                      className="block relative w-full h-full overflow-hidden group"
                    >
                      <Badge className="absolute shadow-2xl shadow-accent-foreground top-2 left-2 w-fit bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white z-20 transition-transform group-hover:scale-110">
                        Click to view
                      </Badge>
                      <div className="relative overflow-hidden rounded-xl">
                        <CreatorNextImage imageUrl={getImageUrl(item)} alt={`asset_${getKey(item)}`} />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      {renderOverlay && <div className="absolute inset-0">{renderOverlay(item, idx, items)}</div>}
                    </Link>
                  ) : (
                    <div className="relative w-full h-full overflow-hidden group" onClick={(e) => onClick?.(item, e)}>
                      <Badge className="absolute top-2 left-2 w-fit px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground shadow-md z-20">
                        #{idx + 1}
                      </Badge>
                      <div className="relative overflow-hidden rounded-xl">
                        <CreatorNextImage imageUrl={getImageUrl(item)} alt={`asset_${getKey(item)}`} />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      {renderOverlay && <div className="absolute inset-0">{renderOverlay(item, idx, items)}</div>}
                    </div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="w-full flex justify-center items-center min-h-100">
              <EmptyElement />
            </div>
          )}
        </Masonry>
      </ScrollArea>
    </div>
  );
};
