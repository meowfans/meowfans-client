'use client';

import { useAssets } from '@/hooks/useAssets';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useEffect, useRef, useState } from 'react';
import { ShortVideoCard } from './ShortVideoCard';

export default function ShortsFeed() {
  const { getPublicShorts } = useAssets();
  const { handleLoadMore, hasMore, loading, onRefresh, publicShorts } = getPublicShorts({ take: 10 });
  const [globalMute, setGlobalMute] = useState(true);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const last = entries[0];
        if (last.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1
      }
    );

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => observer.disconnect();
  }, [publicShorts, hasMore]); //eslint-disable-line

  return (
    <PageManager>
      <div className="snap-y snap-mandatory overflow-y-scroll h-[calc(100vh-60px)] overscroll-y-contain touch-pan-y items-center justify-center ">
        {publicShorts.map((short, index) => {
          const isLast = index === publicShorts.length - 1;

          return (
            <section key={short.id} ref={isLast ? lastItemRef : null} className="snap-start h-full w-full flex items-center justify-center">
              <div className="w-sm h-full">
                <ShortVideoCard globalMute={globalMute} onSetGlobalMute={setGlobalMute} short={short} />
              </div>
            </section>
          );
        })}
      </div>
    </PageManager>
  );
}
