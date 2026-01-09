'use client';

import Loading from '@/app/loading';
import { PageHeader } from '@/components/PageHeader';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { ScrollUpButton } from '@workspace/ui/globals/ScrollUpButton';
import { useRef } from 'react';
import { Bricks } from './Bricks';
import { useTags } from '@/hooks/useTags';

export const Categories = () => {
  const { handleLoadMore, hasMore, loading, tags } = useTags({});
  const topRef = useRef<HTMLDivElement>(null);

  return (
    <PageManager>
      <InfiniteScrollManager
        LoadingComponent={<Loading />}
        dataLength={tags.length}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        loading={loading}
      >
        <PageHeader title="Categories" enableAd />
        <div ref={topRef} />
        <Bricks tags={tags} />
      </InfiniteScrollManager>
      <div className="fixed bottom-20 right-5 rounded-2xl">
        <ScrollUpButton topRef={topRef} />
      </div>
    </PageManager>
  );
};
