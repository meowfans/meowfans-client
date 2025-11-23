'use client';

import { usePosts } from '@/hooks/usePosts';
import { Badge } from '@workspace/ui/components/badge';
import { Separator } from '@workspace/ui/components/separator';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import Link from 'next/link';
import { PostsHeader } from './PostsHeader';

export const Posts = () => {
  const { handleLoadMore, hasMore, loading, posts } = usePosts({});
  return (
    <PageManager>
      <PostsHeader />
      <Separator />
      <InfiniteScrollManager dataLength={posts.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id} className="relative group overflow-hidden rounded-xl shadow-sm">
              <div
                className="aspect-square bg-cover bg-center w-full transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${post.preview})` }}
              />

              <div className="absolute top-0 right-0 m-1">
                <Badge>{post.types}</Badge>
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-black/50 px-2 py-1">
                <p className="truncate text-white text-xs md:text-sm">{post.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScrollManager>
    </PageManager>
  );
};
