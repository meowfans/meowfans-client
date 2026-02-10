import { CreatorCard } from '@/app/creators/components/CreatorCard';
import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';

interface FollowingGridProps {
  creators: GetDefaultCreatorsOutput[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export const FollowingGrid = ({ creators, loading, hasMore, loadMore }: FollowingGridProps) => {
  return (
    <div className="flex-1 min-h-0 overflow-y-scroll" id="following-scroll-wrapper">
      <InfiniteScrollManager
        dataLength={creators.length}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        scrollableDiv="following-scroll-wrapper"
        customHeight="h-full"
      >
        <div className="grid grid-cols-1 gap-6 p-6 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
        {loading && <Loading />}
      </InfiniteScrollManager>
    </div>
  );
};
