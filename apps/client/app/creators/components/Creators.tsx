'use client';

import { PageHandler } from '@/components/PageHandler';
import { useServerCreators } from '@/hooks/server/useServerCreators';
import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { CreatorCard } from './CreatorCard';
import { CreatorsHeader } from './CreatorsHeader';

interface CreatorsProps {
  initialCreators: GetDefaultCreatorsOutput[];
}

export function Creators({ initialCreators }: CreatorsProps) {
  const { creators, loadMore, hasMore, loading } = useServerCreators({ take: 30 }, initialCreators);

  return (
    <PageHandler isLoading={loading && !initialCreators.length} isEmpty={!creators.length}>
      <div className="flex-1 min-h-0 overflow-y-scroll">
        <CreatorsHeader />
        <div id="creators-scroll-wrapper">
          <InfiniteScrollManager dataLength={creators.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore} useWindowScroll>
            <div className="grid grid-cols-1 gap-6 p-6 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </InfiniteScrollManager>
        </div>
      </div>
    </PageHandler>
  );
}
