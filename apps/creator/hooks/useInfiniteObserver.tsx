'use client';

import { useEffect, useRef } from 'react';

interface UseInfiniteObserverProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  root?: Element | null;
  rootMargin?: string;
}

export const useInfiniteObserver = ({ hasMore, loading, onLoadMore, root, rootMargin = '200px' }: UseInfiniteObserverProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const last = entries[0];
        if (last.isIntersecting) onLoadMore();
      },
      { root: null, rootMargin, threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore, root, rootMargin]);

  return ref;
};
