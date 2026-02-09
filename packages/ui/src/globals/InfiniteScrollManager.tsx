'use client';

import { cn } from '@workspace/ui/lib/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loading } from './Loading';

interface InfiniteScrollManagerProps {
  dataLength: number;
  loading: boolean;
  onLoadMore: () => unknown;
  hasMore: boolean;
  onRefresh?: () => unknown;
  children?: React.ReactNode;
  customHeight?: string;
  scrollableDiv?: string;
  scrollThreshold?: number;
  inverse?: boolean;
  useWindowScroll?: boolean;
}

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loading />
      <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Developing Masterpieces</p>
    </div>
  );
};

export const InfiniteScrollManager: React.FC<InfiniteScrollManagerProps> = ({
  dataLength,
  onLoadMore,
  hasMore,
  children,
  scrollableDiv,
  inverse,
  scrollThreshold = 0.7,
  customHeight = 'h-full',
  useWindowScroll
}) => {
  if (useWindowScroll) {
    return (
      <InfiniteScroll
        inverse={inverse}
        loader={<LoadingComponent />}
        hasMore={hasMore}
        scrollThreshold={scrollThreshold}
        next={onLoadMore}
        dataLength={dataLength}
      >
        {children}
      </InfiniteScroll>
    );
  }

  return scrollableDiv ? (
    <InfiniteScroll
      inverse={inverse}
      loader={<LoadingComponent />}
      hasMore={hasMore}
      scrollThreshold={scrollThreshold}
      next={onLoadMore}
      dataLength={dataLength}
      scrollableTarget={scrollableDiv}
    >
      {children}
    </InfiniteScroll>
  ) : (
    <div id="scrollableDiv" className={cn('overflow-auto', customHeight)} style={{ WebkitOverflowScrolling: 'touch' }}>
      <InfiniteScroll
        loader={<LoadingComponent />}
        inverse={inverse}
        hasMore={hasMore}
        scrollThreshold={0.7}
        next={onLoadMore}
        dataLength={dataLength}
        scrollableTarget="scrollableDiv"
      >
        {children}
      </InfiniteScroll>
    </div>
  );
};
