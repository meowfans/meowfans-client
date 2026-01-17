'use client';

import { GalleryManager } from '@/components/GalleryManager';

import { VaultsGalleryOptions } from '@/components/VaultsGalleryOptions';
import { useVaults } from '@/hooks/useVaults';
import { TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { CreatorProfileHeader } from './CreatorProfileHeader';

interface Props {
  username: string;
}

export const CreatorProfileVaults: React.FC<Props> = ({ username }) => {
  const { vaults, loadMore, hasMore, loading, refresh } = useVaults({ username, take: 30 });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={vaults.length} hasMore={hasMore} loading={loading} onLoadMore={loadMore} onRefresh={refresh}>
        <CreatorProfileHeader />
        <TabsList>
          <TabsTrigger value={'posts'}>Posts</TabsTrigger>
          <TabsTrigger value={'vaults'}>Vaults</TabsTrigger>
          <TabsTrigger value={'about'}>About</TabsTrigger>
        </TabsList>
        <GalleryManager
          loading={loading}
          items={vaults}
          getKey={(vault) => vault.id}
          getImageUrl={(vault) => vault.preview}
          applyLink
          pathname="/vaults"
          renderOverlay={(vault) => <VaultsGalleryOptions vault={vault} />}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
