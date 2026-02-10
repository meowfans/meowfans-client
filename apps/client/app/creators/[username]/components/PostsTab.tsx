'use client';

import { BlurImage } from '@/components/BlurImage';
import { PageHandler } from '@/components/PageHandler';
import { usePosts } from '@/hooks/usePosts';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Lock, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface PostsTabProps {
  username: string;
}

export function PostsTab({ username }: PostsTabProps) {
  const { posts, handleLoadMore, hasMore, loading } = usePosts({
    username,
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc
  });

  return (
    <PageHandler isLoading={loading} isEmpty={posts.length === 0} path={APP_PATHS.POSTS}>
      <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} onLoadMore={handleLoadMore}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

                  {post.objectCount > 0 && (
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {post.objectCount} {post.objectCount === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <p className="mb-2 line-clamp-2 text-sm text-foreground">{post.caption}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                    {post.isLiked && <Heart className="h-4 w-4 fill-red-500 text-red-500" />}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {loading && <Loading />}
      </InfiniteScrollManager>
    </PageHandler>
  );
}
