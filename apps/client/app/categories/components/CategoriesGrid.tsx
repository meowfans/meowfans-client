import { ApplyAd } from '@/components/ApplyAd';
import { PageHandler } from '@/components/PageHandler';
import { TagsEntity } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { CategoryItem } from './CategoryItem';

interface CategoriesGridProps {
  filteredTags: TagsEntity[];
  loading: boolean;
  hasMore: boolean;
  handleLoadMore: () => void;
  searchQuery: string;
  initialTags: TagsEntity[];
}

export const CategoriesGrid = ({ filteredTags, loading, hasMore, handleLoadMore, searchQuery, initialTags }: CategoriesGridProps) => {
  return (
    <PageHandler isLoading={loading && !initialTags.length} isEmpty={!filteredTags.length}>
      <InfiniteScrollManager
        dataLength={filteredTags.length}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        useWindowScroll
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredTags.map((tag, index) => {
            const uniqueKey = `tag-${tag.id}-${index}`;
            return (
              <ApplyAd
                canApplyAd={index > 0 && index % 48 === 0}
                element={<CategoryItem index={index} tag={tag} key={uniqueKey} />}
                zoneIndex={index}
                key={uniqueKey}
              />
            );
          })}
        </div>
      </InfiniteScrollManager>
    </PageHandler>
  );
};
