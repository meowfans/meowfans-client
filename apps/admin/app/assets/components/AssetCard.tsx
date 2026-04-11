'use client';

import { AssetsEntity, FileType } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { ExternalLink, Fullscreen, PlayCircle } from 'lucide-react';
import { getFileTypeIcon } from './AssetIcons';

interface AssetCardProps {
  asset: AssetsEntity;
  mode: 'grid' | 'list';
  index: number;
  showCarousel: boolean;
  onShowCarousel: (val: boolean) => void;
}

export const AssetCard = ({ asset, mode, index, onShowCarousel, showCarousel }: AssetCardProps) => {
  const isVideo = asset.fileType === FileType.Video;

  if (mode === 'list') {
    return (
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (index % 10) * 0.05 }}>
        <Card className="p-2 md:p-3 border-primary/5 hover:border-primary/20 transition-all hover:bg-primary/[0.02] shadow-sm flex items-center gap-3 md:gap-4 overflow-hidden relative group">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-primary/10 relative">
            {asset.rawUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset.rawUrl}
                alt=""
                className="h-full w-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              getFileTypeIcon(asset.fileType)
            )}
            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <PlayCircle className="h-5 w-5 text-white drop-shadow-lg" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
              <Badge
                variant="outline"
                className="text-[7px] md:text-[8px] h-3.5 md:h-4 px-1 md:px-1.5 font-black italic uppercase tracking-tighter bg-primary/5 text-primary/80 border-primary/10"
              >
                {asset.fileType}
              </Badge>
              <span className="text-[9px] md:text-[10px] text-muted-foreground/40 font-mono truncate max-w-[60px] md:max-w-none">
                #{asset.id.slice(0, 6)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-4 w-4 md:h-5 md:w-5 border border-primary/20">
                <AvatarImage src={asset.creatorProfile?.user?.avatarUrl || ''} />
                <AvatarFallback className="text-[7px] md:text-[8px] font-bold uppercase">
                  {asset.creatorProfile?.user?.username?.[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight truncate max-w-[100px] sm:max-w-none">
                {asset.creatorProfile?.user?.username}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0 hidden sm:block">
            <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">{asset.mimeType}</p>
            <p className="text-[10px] font-mono text-muted-foreground/60">{new Date(asset.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="shrink-0 flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-all translate-x-1 sm:translate-x-2 group-hover:translate-x-0"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (index % 20) * 0.02 }}>
      <Card className="overflow-hidden border-primary/5 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group relative aspect-[4/5] bg-muted/20">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0">
          {asset.rawUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={asset.rawUrl}
              alt=""
              className="h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-secondary/20 shadow-inner">
              <div className="scale-150 opacity-20 group-hover:opacity-100 group-hover:scale-[2] transition-all duration-500">
                {getFileTypeIcon(asset.fileType)}
              </div>
            </div>
          )}
        </div>

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none group-hover:scale-125 transition-transform duration-500">
            <PlayCircle className="h-12 w-12 text-white/50 backdrop-blur-sm rounded-full p-2 border border-white/20" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3 z-30 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 border-2 border-white/20 ring-1 ring-primary/20">
                <AvatarImage src={asset.creatorProfile?.user?.avatarUrl || ''} />
                <AvatarFallback className="text-[10px] font-bold uppercase">{asset.creatorProfile?.user?.username?.[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-[10px] font-black italic uppercase text-white truncate drop-shadow-md tracking-tighter">
                  {asset.creatorProfile?.user?.username}
                </p>
                <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest leading-none">Creator Profile</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <Badge
                variant="outline"
                className="text-[8px] px-1.5 h-4 font-black uppercase tracking-tighter bg-white/10 text-white border-white/20 backdrop-blur-md"
              >
                {asset.mimeType.split('/')[1] || asset.fileType}
              </Badge>
              <button className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95 shadow-lg shadow-primary/20">
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
            <Fullscreen className="cursor-pointer h-4 w-4" onClick={() => onShowCarousel(true)} />
          </div>
        </div>

        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="scale-75 text-white">{getFileTypeIcon(asset.fileType)}</div>
            <span className="text-[8px] font-black uppercase text-white tracking-widest">{asset.fileType}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
