'use client';

import { useEffect } from 'react';

interface UseInfiniteObserverProps {
  target: React.RefObject<Element | null>;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  root?: Element | null;
  rootMargin?: string;
}

export const useInfiniteObserver = ({ target, hasMore, loading, onLoadMore, root, rootMargin = '200px' }: UseInfiniteObserverProps) => {
  useEffect(() => {
    if (!target.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          onLoadMore();
        }
      },
      {
        root: root || null,
        rootMargin,
        threshold: 0.1
      }
    );

    observer.observe(target.current);

    return () => observer.disconnect();
  }, [target, hasMore, loading, onLoadMore, root, rootMargin]);
};
