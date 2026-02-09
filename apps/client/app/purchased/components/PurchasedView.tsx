'use client';

import { useFanAssets } from '@/hooks/useFanAssets';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import Image from 'next/image';

export function PurchasedView() {
  const { fanAssets, loading, hasMore, handleLoadMore } = useFanAssets({ take: 30 });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scanning Collection</p>
      </div>
    );
  }

  if (!fanAssets.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Collection Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-3">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Collection</h1>
        <p className="text-muted-foreground">Access all the exclusive content you&apos;ve purchased.</p>
      </div>

      <InfiniteScrollManager dataLength={fanAssets.length} loading={loading} useWindowScroll hasMore={hasMore} onLoadMore={handleLoadMore}>
        <div className="grid grid-cols-1 gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {fanAssets.map((asset) => (
            <Card
              key={asset.id}
              className="group relative aspect-square overflow-hidden border-none bg-secondary/20 shadow-none transition-all hover:bg-secondary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-0 h-full w-full">
                <Image
                  width={300}
                  height={400}
                  src={asset.rawUrl}
                  alt="Purchased asset"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-xs font-medium text-white">Full Access</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {loading && <Loading />}
      </InfiniteScrollManager>
    </div>
  );
}
