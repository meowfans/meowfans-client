'use client';

import { useAssets } from '@/hooks/useAssets';
import { AssetsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Carousel } from '@workspace/ui/globals/Carousel';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AssetCard } from './AssetCard';
import { AssetsHeader } from './AssetsHeader';

export const Assets = () => {
 const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
 const { assets, loading, hasMore, onLoadMore } = useAssets({ take: 50 });
 const [showCarousel, setShowCarousel] = useState<number | null>(null);

 // Carousel logic handled by layout now, removing body scroll lock
 useEffect(() => {
 if (showCarousel) {
  // scroll to top when opening carousel to ensure it's visible
  window.scrollTo({ top: 0, behavior: 'smooth' });
 }
 }, [showCarousel]);

 return (
 <div className="max-w-[1600px] mx-auto flex flex-col w-full px-4 md:px-8 pb-12">
  <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 py-4 mb-2">
  <AssetsHeader count={assets?.count || 0} viewMode={viewMode} onViewModeChange={setViewMode} />
  </div>

  <AnimatePresence>
  {showCarousel && (
   <motion.div
   initial={{ height: 0, opacity: 0, margin: 0 }}
   animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
   exit={{ height: 0, opacity: 0, margin: 0 }}
   className="overflow-hidden"
   >
   <div className="relative group/carousel bg-primary/[0.03] border border-primary/10 rounded-[2rem] md:rounded-[3rem] p-2 md:p-4">
    <div className="absolute top-3 right-3 z-50 flex items-center gap-2">
    <Button
     variant="ghost"
     size="icon"
     onClick={() => setShowCarousel(null)}
     className="h-10 w-10 rounded-2xl bg-black/20 hover:bg-black/40 backdrop-blur-xl border border-white/10 text-white shadow-2xl transition-all hover:scale-110 active:scale-90"
    >
     <X className="h-4 w-4"/>
    </Button>
    </div>

    <div className="max-w-5xl mx-auto">
    <Carousel
     items={assets?.assets as AssetsEntity[]}
     getKey={(asset) => asset.id}
     getUrl={(asset) => asset.rawUrl}
     getFileType={(asset) => asset.fileType}
     hasMore={hasMore}
     loadMore={onLoadMore}
     urls={assets?.assets.map((asset) => asset.rawUrl as string)}
     loading={loading}
     getPoster={(item) => item.blurredUrl || ''}
     aspectRatio="video"
     currentIndex={showCarousel}
    />
    </div>

    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20">
    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Media Preview Active</span>
    </div>
   </div>
   </motion.div>
  )}
  </AnimatePresence>

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
    viewMode === 'grid'
    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
    : 'flex flex-col gap-3'
   }
   >
   {assets?.assets.map((asset, index) => (
    <AssetCard
    showCarousel={showCarousel}
    onShowCarousel={setShowCarousel}
    key={asset.id}
    asset={asset}
    mode={viewMode}
    index={index}
    />
   ))}
   </div>
  </InfiniteScrollManager>
  </div>
 </div>
 );
};
