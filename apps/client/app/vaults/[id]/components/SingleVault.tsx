'use client';

import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { GalleryManager } from '@/components/GalleryManager';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SingleVaultHeader } from './SingleVaultHeader';
import { SingleVaultInfo } from './SingleVaultInfo';
import { VaultObjectsGalleryOptions } from './VaultObjectsGalleryOptions';

type TabProps = 'gallery' | 'about';

export const SingleVault = () => {
  const { id } = useParams();
  const router = useRouter();
  const { fan } = useFan();
  const searchParams = useSearchParams();
  const { getVaultObjects } = useVaults();
  const [expanded, setExpanded] = useState<boolean>(false);
  const defaultCurrentTab = (searchParams.get('tab') as TabProps) || 'gallery';
  const [currentTab, setCurrentTab] = useState<TabProps>(defaultCurrentTab);

  const {
    vaultObjects,
    handleLoadMore: handleLoadMoreVaultObjects,
    hasMore,
    loading,
    vault
  } = getVaultObjects({
    vaultId: id as string,
    fanId: fan?.fanId,
    sortBy: SortBy.VaultObjectSuffix,
    orderBy: SortOrder.Asc
  });

  const handleTabChange = (tab: TabProps) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`?${params.toString()}`, { scroll: false });
    setCurrentTab(tab);
  };

  return (
    <PageManager className="p-1">
      <InfiniteScrollManager hasMore={hasMore} dataLength={vaultObjects.length} loading={loading} onLoadMore={handleLoadMoreVaultObjects}>
        <SingleVaultHeader expanded={expanded} onExpanded={(ex) => setExpanded(ex)} />

        <Tabs defaultValue={currentTab} onValueChange={(val) => handleTabChange(val as TabProps)}>
          <TabsList>
            <TabsTrigger value={'gallery'}>Gallery</TabsTrigger>
            <TabsTrigger value={'about'}>About</TabsTrigger>
          </TabsList>
          <TabsContent value="gallery" className="mt-3">
            <GalleryManager
              loading={loading}
              items={vaultObjects}
              getKey={(vaultObject) => vaultObject.id}
              getImageUrl={(vaultObject) => vaultObject.asset?.rawUrl}
              renderOverlay={(vaultObject, idx, vaultItems) => (
                <VaultObjectsGalleryOptions idx={idx} vaultObject={vaultObject} vaultObjects={vaultItems} />
              )}
            />
            <ExoAdProvider zoneId="5771274" classIdName="eas6a97888e37" zoneType={ExoAdZoneTypes.OutStream} />
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <SingleVaultInfo vault={vault} />
          </TabsContent>
        </Tabs>
      </InfiniteScrollManager>
    </PageManager>
  );
};
