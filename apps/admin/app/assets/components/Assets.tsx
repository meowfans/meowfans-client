'use client';

import { useAssets } from '@/hooks/useAssets';
import { AssetsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Carousel } from '@workspace/ui/globals/Carousel';
import { FullscreenViewer } from '@workspace/ui/globals/FullscreenViewer';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Fragment, useState } from 'react';
import { AssetCard } from './AssetCard';
import { AssetsHeader } from './AssetsHeader';

export const Assets = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { assets, loading, hasMore, onLoadMore } = useAssets({ take: 50 });
  const [showCarousel, setShowCarousel] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col w-full px-4 md:px-8 pb-12">
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 mb-2">
        <AssetsHeader count={assets?.count || 0} viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      <div className="flex flex-col gap-4">
        <InfiniteScrollManager
          useWindowScroll
          dataLength={assets?.assets.length || 0}
          hasMore={hasMore}
          onLoadMore={onLoadMore}
          loading={loading}
        >
          <div
            className={
              viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : 'flex flex-col gap-3'
            }
          >
            {assets?.assets.map((asset, index) => (
              <Fragment key={asset.id}>
                <AssetCard onShowCarousel={setShowCarousel} asset={asset} mode={viewMode} index={index} />

                <AnimatePresence>
                  {showCarousel === index && (
                    <motion.div
                      className="col-span-full"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="mt-4 relative bg-primary/[0.03] border border-primary/10 rounded-[2rem] md:rounded-[3rem] p-2 md:p-4">
                        <div className="absolute top-3 right-3 z-50">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowCarousel(null)}
                            className="h-10 w-10 rounded-2xl bg-black/20 hover:bg-black/40 backdrop-blur-xl border border-white/10 text-white"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {isMobile ? (
                          <FullscreenViewer
                            items={assets?.assets.map((a) => ({ type: a.fileType, url: a.rawUrl }))}
                            hasMore={hasMore}
                            loadMore={onLoadMore}
                            loading={loading}
                            initialIndex={showCarousel}
                            isOpen={!!showCarousel}
                            onClose={() => setShowCarousel(null)}
                            setCurrentlyViewingIndex={(val) => setShowCarousel(val as number)}
                          />
                        ) : (
                          <Carousel
                            items={assets?.assets as AssetsEntity[]}
                            getKey={(asset) => asset.id}
                            getUrl={(asset) => asset.rawUrl}
                            getFileType={(asset) => asset.fileType}
                            hasMore={hasMore}
                            loadMore={onLoadMore}
                            urls={assets?.assets.map((a) => a.rawUrl as string)}
                            loading={loading}
                            getPoster={(item) => item.blurredUrl || ''}
                            aspectRatio="video"
                            currentIndex={index}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Fragment>
            ))}
          </div>
        </InfiniteScrollManager>
      </div>
    </div>
  );
};
