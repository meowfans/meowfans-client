'use client';

import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { useServerPurchased } from '@/hooks/server/useServerPurchased';
import { GetFanAssetsOutput } from '@workspace/gql/generated/graphql';
import { PurchasedGallery } from './PurchasedGallery';
import { PurchasedHeader } from './PurchasedHeader';

interface PurchasedProps {
  initialData: GetFanAssetsOutput[];
}

export function Purchased({ initialData }: PurchasedProps) {
  const { fanAssets, loading, hasMore, loadMore } = useServerPurchased({ take: 30 }, initialData);

  return (
    <div className="flex flex-1 flex-col p-2 bg-background/50 backdrop-blur-3xl h-screen">
      <PurchasedHeader />

      <div className="w-full flex justify-center my-2">
        <div className="hidden md:block">
          <ExoAdProvider zoneId="5772068" zoneType={ExoAdZoneTypes.DesktopBanner} />
        </div>
        <div className="block md:hidden">
          <ExoAdProvider zoneId="5771444" zoneType={ExoAdZoneTypes.MobileBanner} />
        </div>
      </div>

      <PurchasedGallery fanAssets={fanAssets} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
    </div>
  );
}
