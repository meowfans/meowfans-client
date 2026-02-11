'use client';

import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { Image as ImageIcon } from 'lucide-react';
import { SingleVaultObjectCard } from './SingleVaultObjectCard';

interface SingleVaultContentProps {
  vaultObjects: any[];
  objectCount?: number;
  isVaultPurchased: boolean;
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  onPurchaseObject: (id: string, price: number) => void;
}

export function SingleVaultContent({
  vaultObjects,
  objectCount,
  isVaultPurchased,
  loading,
  hasMore,
  loadMore,
  onPurchaseObject
}: SingleVaultContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Content</h2>
        {vaultObjects && vaultObjects.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {vaultObjects.length} of {objectCount} loaded
          </p>
        )}
      </div>

      {vaultObjects && vaultObjects.length > 0 ? (
        <InfiniteScrollManager dataLength={vaultObjects.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {vaultObjects.map((obj, index) => (
              <SingleVaultObjectCard
                key={obj.id}
                obj={obj}
                index={index}
                isVaultPurchased={isVaultPurchased}
                onPurchase={onPurchaseObject}
              />
            ))}
          </div>

          {loading && <Loading />}
        </InfiniteScrollManager>
      ) : (
        <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed">
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">No objects in this vault yet</p>
          </div>
        </div>
      )}
    </div>
  );
}
