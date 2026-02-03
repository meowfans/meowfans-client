'use client';

import { ShortVideoCard } from '@/app/@v2/shorts/components/ShortVideoCard';
import { usePublicShorts } from '@/hooks/usePublicShorts';
import { useEffect, useRef, useState } from 'react';

export function Shorts() {
  const { handleLoadMore, hasMore, publicShorts, loading } = usePublicShorts({ take: 10 });
  const [globalMute, setGlobalMute] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => observer.disconnect();
  }, [publicShorts, hasMore, loading]); // eslint-disable-line

  return (
    <div className="relative flex-1 w-full bg-black overflow-hidden">
      <div ref={containerRef} className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        {publicShorts.map((short, index) => (
          <div key={short.id} ref={index === publicShorts.length - 1 ? lastItemRef : null} className="h-full w-full snap-start snap-always">
            <ShortVideoCard short={short} globalMute={globalMute} onToggleMute={() => setGlobalMute(!globalMute)} />
          </div>
        ))}

        {loading && (
          <div className="h-full w-full flex items-center justify-center bg-black">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
