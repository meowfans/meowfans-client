'use client';

import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { useServerShorts } from '@/hooks/server/useServerShorts';
import { GetPublicShortsOutput } from '@workspace/gql/generated/graphql';
import { AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ShortCard } from './ShortCard';
import { ShortsEmptyState } from './ShortsEmptyState';
import { ShortsOverlay } from './ShortsOverlay';

interface ShortsProps {
  initialShorts: GetPublicShortsOutput[];
}

export function Shorts({ initialShorts }: ShortsProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { publicShorts, loading, loadMore, hasMore } = useServerShorts({ take: 10 }, initialShorts);
  const [globalMute, setGlobalMute] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
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
      loadMore();
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative h-[calc(100svh-64px)] w-full overflow-hidden flex flex-col items-center justify-center">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full max-w-100 md:rounded-[2.5rem] md:my-4 md:h-[calc(100%-2rem)] md:border-8 md:border-white/5 md:shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar select-none touch-pan-y relative"
      >
        <AnimatePresence key={'_animate_presence'} mode="popLayout">
          {publicShorts.length === 0 ? (
            <ShortsEmptyState onRefresh={() => window.location.reload()} />
          ) : (
            publicShorts.map((short, index) => (
              <div key={`${short.id}-${index}`} className="h-full w-full snap-start snap-always relative">
                <ShortCard globalMute={globalMute} onSetGlobalMute={setGlobalMute} short={short} isActive={index === activeIndex} />

                {index > 0 && index % 3 === 0 && index === activeIndex && (
                  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center">
                    <div className="w-full h-full">
                      <ExoAdProvider zoneId="5771266" zoneType={ExoAdZoneTypes.OutStream} />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          {loading && <Loader className="animate-spin w-10 h-10" />}
        </AnimatePresence>
      </div>

      {publicShorts.length > 0 && <ShortsOverlay activeIndex={activeIndex} totalShorts={publicShorts.length} />}
    </div>
  );
}
