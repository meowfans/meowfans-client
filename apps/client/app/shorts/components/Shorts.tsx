'use client';

import { usePublicShorts } from '@/hooks/usePublicShorts';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ShortCard } from './ShortCard';
import { ShortsEmptyState } from './ShortsEmptyState';
import { ShortsLoading } from './ShortsLoading';
import { ShortsOverlay } from './ShortsOverlay';

export function Shorts() {
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
    return <ShortsLoading fullScreen />;
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
            <ShortsEmptyState onRefresh={handleRefresh} />
          ) : (
            publicShorts.map((short, index) => (
              <div key={`${short.id}-${index}`} className="h-full w-full snap-start snap-always relative">
                <ShortCard globalMute={globalMute} onSetGlobalMute={setGlobalMute} short={short} isActive={index === activeIndex} />
              </div>
            ))
          )}
        </AnimatePresence>

        {loading && publicShorts.length > 0 && <ShortsLoading />}
      </div>

      {publicShorts.length > 0 && <ShortsOverlay activeIndex={activeIndex} totalShorts={publicShorts.length} />}
    </div>
  );
}
