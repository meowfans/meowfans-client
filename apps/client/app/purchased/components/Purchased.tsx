'use client';

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
    <div className="flex flex-1 flex-col gap-8 md:gap-12 p-4 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      <PurchasedHeader />
      <PurchasedGallery fanAssets={fanAssets} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
    </div>
  );
}
