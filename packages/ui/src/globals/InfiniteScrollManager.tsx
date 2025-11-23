'use client';

import { cn } from '@workspace/ui/lib/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProgressBar from './ProgressBar';

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
  loading,
  onRefresh = () => {},
  children,
  customHeight = 'h-[100vh]',
  LoadingComponent
}) => {
  return (
    <div id="scrollableDiv" className={cn('overflow-y-auto', customHeight)} style={{ WebkitOverflowScrolling: 'touch' }}>
      {loading ? (
        LoadingComponent || <ProgressBar isLoading={loading} />
      ) : (
        // <div>Loading...</div>
        <InfiniteScroll
          loader={loading}
          hasMore={hasMore}
          scrollThreshold={0.7}
          next={onLoadMore}
          dataLength={dataLength}
          scrollableTarget="scrollableDiv"
        >
          {children}
        </InfiniteScroll>
      )}
    </div>
  );
};
