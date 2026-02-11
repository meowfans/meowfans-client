'use client';

import { BlurImage } from '@/components/BlurImage';
import { PageHandler } from '@/components/PageHandler';
import { usePosts } from '@/hooks/client/usePosts';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Lock, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface PostSearchResultsProps {
  query: string;
}

export function PostSearchResults({ query }: PostSearchResultsProps) {
  const { posts, loading, hasMore, loadMore } = usePosts({
    searchTerm: query,
    take: 20,
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc
  });

  return (
    <PageHandler isLoading={loading && !posts.length} isEmpty={!posts.length && !loading}>
      <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore} useWindowScroll>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <Card className="group overflow-hidden border-none bg-secondary/20 shadow-none transition-all hover:bg-secondary/40 hover:shadow-lg hover:shadow-primary/5">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <BlurImage
                    src={post.preview}
                    alt={post.caption}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-2 top-2 flex flex-wrap gap-2">
                    {post.unlockPrice && (
                      <Badge variant="secondary" className="gap-1 bg-background/80 backdrop-blur-sm">
                        <Lock className="h-3 w-3" />${post.unlockPrice}
                      </Badge>
                    )}
                    {post.isPurchased && (
                      <Badge variant="default" className="gap-1 bg-primary/80 backdrop-blur-sm">
                        <ShoppingCart className="h-3 w-3" />
                        Purchased
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="mb-2 line-clamp-2 text-xs font-medium text-foreground">{post.caption}</p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                    {post.isLiked && <Heart className="h-3 w-3 fill-red-500 text-red-500" />}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </InfiniteScrollManager>
    </PageHandler>
  );
}
