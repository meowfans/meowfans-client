'use client';

import { CreatorAssetsEntity, FileType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Eye, Play, Trash2 } from 'lucide-react';
import NextImage from 'next/image';

interface AssetsGridProps {
  assets: CreatorAssetsEntity[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onDelete: (id: string) => void;
  onView: (asset: CreatorAssetsEntity['asset']) => void;
  selectedAssets: string[];
  onToggleSelect: (id: string) => void;
}

export function AssetsGrid({ assets, loading, hasMore, onLoadMore, onDelete, onView, selectedAssets, onToggleSelect }: AssetsGridProps) {
  return (
    <div className="p-2 sm:p-6">
      <InfiniteScrollManager dataLength={assets.length} loading={loading} hasMore={hasMore} onLoadMore={onLoadMore}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {assets.map((item, index) => {
              const isSelected = selectedAssets.includes(item.id);
              const isVideo = item.asset.fileType === FileType.Video;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className={`relative group aspect-square rounded-lg overflow-hidden border transition-all ${
                    isSelected ? 'border-primary ring-2 ring-primary ring-offset-1' : 'border-border'
                  }`}
                >
                  {/* Main Content - Tap to View */}
                  <div className="w-full h-full cursor-pointer" onClick={() => onView(item.asset)}>
                    {item.asset.rawUrl ? (
                      isVideo ? (
                        <div className="relative w-full h-full bg-black">
                          <video src={item.asset.rawUrl} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/50 rounded-full p-2">
                              <Play className="h-6 w-6 text-white fill-white/50" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <NextImage
                          src={item.asset.rawUrl}
                          alt="Asset"
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      )
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-xs">No Preview</div>
                    )}
                  </div>

                  {/* Selection Checkbox - Always visible for accessibility/mobile */}
                  <div
                    className="absolute top-2 right-2 z-10 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelect(item.id);
                    }}
                  >
                    <div
                      className={`
                      h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all
                      ${
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-black/30 border-white/70 hover:bg-black/50 hover:border-white text-transparent'
                      }
                    `}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Desktop Hover Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-2 pointer-events-none">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-black pointer-events-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(item.asset);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 rounded-full pointer-events-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {loading && (
          <div className="flex justify-center p-8">
            <Loading />
          </div>
        )}

        {!loading && assets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p>No assets found</p>
          </div>
        )}
      </InfiniteScrollManager>
    </div>
  );
}
