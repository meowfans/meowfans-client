'use client';

import { useFanAssets } from '@/hooks/useFanAssets';
import { PurchasedGallery } from './PurchasedGallery';
import { PurchasedHeader } from './PurchasedHeader';

export function Purchased() {
  const { fanAssets, loading, hasMore, handleLoadMore } = useFanAssets({ take: 30 });

  return (
    <div className="flex flex-1 flex-col gap-8 md:gap-12 p-4 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      <PurchasedHeader />
      <PurchasedGallery fanAssets={fanAssets} loading={loading} hasMore={hasMore} onLoadMore={handleLoadMore} />
    </div>
  );
}
