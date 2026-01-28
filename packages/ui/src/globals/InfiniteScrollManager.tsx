'use client';

import { cn } from '@workspace/ui/lib/utils';
import InfiniteScroll from 'react-infinite-scroll-component';

interface InfiniteScrollManagerProps {
  dataLength: number;
  loading: boolean;
  onLoadMore: () => unknown;
  hasMore: boolean;
  onRefresh?: () => unknown;
  children?: React.ReactNode;
  customHeight?: string;
  scrollableDiv?: string;
  LoadingComponent?: React.ReactNode;
  scrollThreshold?: number;
  inverse?: boolean;
}

export const InfiniteScrollManager: React.FC<InfiniteScrollManagerProps> = ({
  dataLength,
  onLoadMore,
  hasMore,
  children,
  scrollableDiv,
  loading,
  inverse,
  scrollThreshold = 0.7,
  customHeight = 'h-[100vh]',
  LoadingComponent
}) => {
  return scrollableDiv ? (
    <InfiniteScroll
      inverse={inverse}
      loader={null}
      hasMore={hasMore}
      scrollThreshold={scrollThreshold}
      next={onLoadMore}
      dataLength={dataLength}
      scrollableTarget={scrollableDiv}
    >
      {children}
    </InfiniteScroll>
  ) : (
    <div id="scrollableDiv" className={cn('overflow-y-auto', customHeight)} style={{ WebkitOverflowScrolling: 'touch' }}>
      <InfiniteScroll
        loader={null}
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
