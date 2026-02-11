'use client';

import { CreatorCard } from '@/app/creators/components/CreatorCard';
import { PageHandler } from '@/components/PageHandler';
import { useCreators } from '@/hooks/client/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';

interface CreatorSearchResultsProps {
  query: string;
}

export function CreatorSearchResults({ query }: CreatorSearchResultsProps) {
  const { creators, loading, hasMore, loadMore } = useCreators({
    searchTerm: query,
    take: 20,
    sortBy: SortBy.UserCreatedAt,
    orderBy: SortOrder.Desc
  });

  return (
    <PageHandler isLoading={loading && !creators.length} isEmpty={!creators.length && !loading}>
      <InfiniteScrollManager dataLength={creators.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore} useWindowScroll>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </InfiniteScrollManager>
    </PageHandler>
  );
}
