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
  LoadingComponent?: React.ReactNode;
}

export const InfiniteScrollManager: React.FC<InfiniteScrollManagerProps> = ({
  dataLength,
  onLoadMore,
  hasMore,
  children,
  loading,
  customHeight = 'h-[100vh]',
  LoadingComponent
}) => {
  return (
    <div id="scrollableDiv" className={cn('overflow-y-auto', customHeight)} style={{ WebkitOverflowScrolling: 'touch' }}>
      <InfiniteScroll
        loader={null}
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
