'use client';

import { CreatorAssetsEntity, FileType } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { MEOW_FANS_BANNER } from '@workspace/ui/lib/constants';
import { cn } from '@workspace/ui/lib/utils';
import { format } from 'date-fns';
import { ExternalLink, FileIcon, ImageIcon, VideoIcon } from 'lucide-react';
import Image from 'next/image';

interface Props {
  asset: CreatorAssetsEntity;
  isDeleted: boolean;
}

export const CreatorAssetsRow: React.FC<Props> = ({ asset, isDeleted }) => {
  const fileTypeIcon = {
    IMAGE: <ImageIcon className="h-4 w-4" />,
    VIDEO: <VideoIcon className="h-4 w-4" />,
    AUDIO: <FileIcon className="h-4 w-4" />,
    DOCUMENT: <FileIcon className="h-4 w-4" />
  };

  return (
    <div className="hidden md:grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] gap-4 items-center text-sm text-muted-foreground">
      <div className="relative h-14 w-14 bg-muted rounded-md overflow-hidden">
        {asset.asset.fileType === FileType.Video ? (
          <video src={asset.asset.rawUrl} className="h-full w-full object-cover" />
        ) : (
          <Image src={MEOW_FANS_BANNER} alt={asset.id} fill className="object-cover" unoptimized />
        )}

        <Badge variant="secondary" className="absolute top-0 left-0 rounded-none px-1 py-0 text-[9px] bg-background/90">
          {asset.type}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        {fileTypeIcon[asset.asset.fileType] || <FileIcon className="h-4 w-4" />}
        <span>{asset.asset.fileType}</span>
      </div>

      <span>{format(new Date(asset.createdAt), 'MMM dd, yyyy')}</span>

      <span>
        <Badge variant={asset.asset.isPosted ? 'default' : 'secondary'}>{asset.asset.isPosted ? 'Posted' : 'Draft'}</Badge>
      </span>

      <span className={cn(isDeleted && 'text-red-500 font-medium')}>{isDeleted ? 'Deleted' : 'Active'}</span>

      <div className="flex items-center justify-end">
        <a
          href={asset.asset.rawUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};
