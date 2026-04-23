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
  endMessage?: React.ReactNode;
}

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16 px-4">
      <div className="h-px w-12 bg-border/20 mb-6" />
      <Loading />
    </div>
  );
};

const DefaultEndMessage = ({ hasMore, dataLength }: { hasMore: boolean; dataLength: number }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-px w-12 bg-border/20 mb-6" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 text-center">
        {!hasMore && dataLength ? `You've reached the end of the collections` : 'NO COLLECTIONS FOUND'}
      </p>
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
  loading,
  scrollThreshold = 0.7,
  customHeight = 'h-full',
  useWindowScroll,
  endMessage = <DefaultEndMessage hasMore={hasMore} dataLength={dataLength} />
}) => {
  if (useWindowScroll) {
    return (
      <InfiniteScroll
        inverse={inverse}
        loader={loading && <LoadingComponent />}
        hasMore={hasMore}
        scrollThreshold={scrollThreshold}
        next={onLoadMore}
        dataLength={dataLength}
        endMessage={endMessage}
        className={cn(inverse ? 'flex flex-col-reverse' : '')}
      >
        {children}
      </InfiniteScroll>
    );
  }

  return scrollableDiv ? (
    <InfiniteScroll
      inverse={inverse}
      loader={loading && <LoadingComponent />}
      hasMore={hasMore}
      scrollThreshold={scrollThreshold}
      next={onLoadMore}
      dataLength={dataLength}
      scrollableTarget={scrollableDiv}
      endMessage={endMessage}
      className={cn(inverse ? 'flex flex-col-reverse' : '')}
    >
      {children}
    </InfiniteScroll>
  ) : (
    <div id="scrollableDiv" className={cn('overflow-auto', customHeight)} style={{ WebkitOverflowScrolling: 'touch' }}>
      <InfiniteScroll
        loader={loading && <LoadingComponent />}
        inverse={inverse}
        hasMore={hasMore}
        scrollThreshold={0.7}
        next={onLoadMore}
        dataLength={dataLength}
        scrollableTarget="scrollableDiv"
        endMessage={endMessage}
        className={cn(inverse ? 'flex flex-col-reverse' : '')}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
};
