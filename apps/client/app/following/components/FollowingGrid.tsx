import { CreatorCard } from '@/app/creators/components/CreatorCard';
import { PageHandler } from '@/components/PageHandler';
import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';

interface FollowingGridProps {
  creators: GetDefaultCreatorsOutput[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  initialCreators: GetDefaultCreatorsOutput[];
}

export function FollowingGrid({ creators, loading, hasMore, loadMore, initialCreators }: FollowingGridProps) {
  return (
    <PageHandler isEmpty={!creators.length} isLoading={loading && !initialCreators.length}>
      <div>
        <InfiniteScrollManager dataLength={creators.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore} useWindowScroll>
          <div className="grid grid-cols-1 gap-6 p-6 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
          {loading && <Loading />}
        </InfiniteScrollManager>
      </div>
    </PageHandler>
  );
};
