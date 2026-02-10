'use client';

import { PageHandler } from '@/components/PageHandler';
import { useLikedPosts } from '@/hooks/useLikedPosts';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { useState } from 'react';
import { LikedPostsHeader } from './LikedPostsHeader';
import { LikedPostsList } from './LikedPostsList';

export function LikedPosts() {
  const { postLikes, loadMore, hasMore, loading } = useLikedPosts({ take: 30 });
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-4 md:p-8 pt-4 md:pt-0 max-w-4xl mx-auto w-full pb-20">
      <LikedPostsHeader count={postLikes.length} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PageHandler isLoading={loading && !postLikes.length} isEmpty={!postLikes.length && !loading} path={APP_PATHS.LIKED_POSTS}>
        <LikedPostsList items={postLikes} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      </PageHandler>
    </div>
  );
}
