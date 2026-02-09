'use client';

import { usePublicShorts } from '@/hooks/usePublicShorts';
import { Button } from '@workspace/ui/components/button';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCcw, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ShortCard } from './ShortCard';

export function ShortsView() {
  const [isMounted, setIsMounted] = useState(false);
  const { publicShorts, loading, handleLoadMore, hasMore, handleRefresh } = usePublicShorts({ take: 10 });
  const [globalMute, setGlobalMute] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPos = e.currentTarget.scrollTop;
    const itemHeight = e.currentTarget.clientHeight;
    const index = Math.round(scrollPos / itemHeight);

    if (index !== activeIndex) {
      setActiveIndex(index);
    }

    // Load more when reaching near the end
    if (scrollPos + itemHeight * 2 >= e.currentTarget.scrollHeight && hasMore && !loading) {
      handleLoadMore();
    }
  };

  if (!isMounted) return null;

  if (loading && publicShorts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] gap-4">
        <Loading />
        <p className="text-xs uppercase tracking-[0.3em] animate-pulse">Syncing Reels</p>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100svh-64px)] w-full overflow-hidden flex items-center justify-center">
      {/* Centered Phone-like Container for Desktop */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full max-w-[400px] md:rounded-[2.5rem] md:my-4 md:h-[calc(100%-2rem)] md:border-[8px] md:border-white/5 md:shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar select-none touch-pan-y relative"
      >
        <AnimatePresence mode="popLayout">
          {publicShorts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6"
            >
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center border border-border">
                <Sparkles className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tight">End of the line</h2>
                <p className="text-sm text-muted-foreground max-w-[200px]">You&apos;ve seen all the shorts we have for now. Check back later!</p>
              </div>
              <Button onClick={handleRefresh} variant="outline" className="rounded-full gap-2 transition-all">
                <RefreshCcw className="h-4 w-4" />
                Refresh Feed
              </Button>
            </motion.div>
          ) : (
            publicShorts.map((short, index) => (
              <div key={`${short.id}-${index}`} className="h-full w-full snap-start snap-always relative">
                <ShortCard globalMute={globalMute} onSetGlobalMute={setGlobalMute} short={short} isActive={index === activeIndex} />
              </div>
            ))
          )}
        </AnimatePresence>

        {loading && publicShorts.length > 0 && (
          <div className="h-20 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>

      {/* Desktop Overlay Hints */}
      <div className="hidden md:block absolute bottom-12 right-[calc(50%-320px)] pointer-events-none z-50">
        <div className="flex flex-col gap-3">
          <div className="bg-background/80 backdrop-blur-xl px-4 py-3 rounded-2xl border border-border shadow-2xl">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest mb-1">Active Reels</span>
              <span className="text-xs font-bold">
                {activeIndex + 1} <span className="text-muted-foreground/30">/</span> {publicShorts.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
