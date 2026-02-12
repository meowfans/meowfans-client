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
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <Loading />
    </div>
  );
};

const DefaultEndMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-[1px] w-12 bg-border/20 mb-6" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 text-center">
        You&apos;ve reached the end of the collection
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
  scrollThreshold = 0.7,
  customHeight = 'h-full',
  useWindowScroll,
  endMessage = <DefaultEndMessage />
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
        endMessage={endMessage}
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
      endMessage={endMessage}
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
        endMessage={endMessage}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
};
