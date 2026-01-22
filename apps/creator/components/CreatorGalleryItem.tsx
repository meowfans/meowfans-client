import { FileType } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { MEOW_FANS_BANNER } from '@workspace/ui/lib/constants';
import { motion } from 'framer-motion';
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
      <Badge className="absolute left-3 top-3 z-20 bg-background/80 backdrop-blur">#{index + 1}</Badge>

      <div className="relative aspect-3/4 w-full overflow-hidden rounded-xs">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={`asset_${key}`} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <video src={url} className="h-full w-full object-cover" muted />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>

      {renderOverlay && <div className="absolute inset-0 z-30">{renderOverlay(item, index, allItems)}</div>}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative rounded-xl bg-card
        shadow-sm hover:shadow-lg
        transition-shadow
        ${className ?? ''}
      `}
    >
      {applyLink ? (
        <Link href={`${basePath}/${key}`} onClick={(e) => onClick?.(item, e)} className="block w-full h-full">
          {content}
        </Link>
      ) : (
        <div onClick={(e) => onClick?.(item, e)} className="block w-full h-full">
          {content}
        </div>
      )}
    </motion.div>
  );
};
