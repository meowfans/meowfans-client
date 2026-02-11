import { PageHandler } from '@/components/PageHandler';
import { TagsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Hash, TrendingUp } from 'lucide-react';
import Link from 'next/link';

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
              <Link key={uniqueKey} href={`/categories/${encodeURIComponent(tag.label)}`}>
                <Card className="group overflow-hidden border-none bg-secondary/20 shadow-none transition-all hover:bg-secondary/40 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="flex aspect-square flex-col items-center justify-center p-6 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 transition-transform group-hover:scale-110">
                      <Hash className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="line-clamp-2 text-sm font-semibold tracking-tight">{tag.label}</h3>

                    {index < 6 && (
                      <Badge variant="secondary" className="mt-2 gap-1 text-[10px]">
                        <TrendingUp className="h-2.5 w-2.5" />
                        Trending
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </InfiniteScrollManager>
    </PageHandler>
  );
};
