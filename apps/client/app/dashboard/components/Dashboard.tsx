'use client';

import { CreatorProfilesGalleryOptions } from '@/components/CreatorProfilesGalleryOptions';
import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';

export const Dashboard = () => {
  const { creators, loading, loadMore, hasMore, refresh } = useCreators({
    sortBy: SortBy.UserCreatedAt,
    orderBy: SortOrder.Desc
  });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={creators.length} hasMore={hasMore} loading={loading} onLoadMore={loadMore} onRefresh={refresh}>
        <PageHeader title="Explore premium creators" />
        <GalleryManager
          loading={loading}
          items={creators}
          getKey={(user) => user.username}
          getImageUrl={(user) => user.avatarUrl}
          applyLink
          pathname="/creators"
          renderOverlay={(user) => <CreatorProfilesGalleryOptions user={user} />}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
