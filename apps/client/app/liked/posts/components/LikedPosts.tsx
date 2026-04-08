'use client';

import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { PageHandler } from '@/components/PageHandler';
import { useServerLikedPosts } from '@/hooks/server/useServerLikedPosts';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { GetLikedPostsOutput } from '@workspace/gql/generated/graphql';
import { useState } from 'react';
import { LikedPostsHeader } from './LikedPostsHeader';
import { LikedPostsList } from './LikedPostsList';

interface LikedPostsProps {
  initialPostLikes: GetLikedPostsOutput[];
}

export function LikedPosts({ initialPostLikes }: LikedPostsProps) {
  const { postLikes, loadMore, hasMore, loading } = useServerLikedPosts({ take: 30 }, initialPostLikes);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-2 md:p-8 pt-4 md:pt-0 max-w-4xl mx-auto w-full pb-20">
      <LikedPostsHeader count={postLikes.length} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="w-full flex flex-col items-center justify-center my-4 gap-4">
        <div className="hidden md:block">
          <ExoAdProvider zoneId="5772070" zoneType={ExoAdZoneTypes.DesktopBanner} />
        </div>
        <div className="block md:hidden">
          <ExoAdProvider zoneId="5771438" zoneType={ExoAdZoneTypes.MobileBanner} />
        </div>
      </div>
      <PageHandler isLoading={loading && !initialPostLikes.length} isEmpty={!postLikes.length} path={APP_PATHS.LIKED_POSTS}>
        <LikedPostsList items={postLikes} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      </PageHandler>
    </div>
  );
}
