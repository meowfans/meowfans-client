'use client';

import { Button } from '@workspace/ui/components/button';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { cn } from '@workspace/ui/lib/utils';
import { Grid3x3, Image as ImageIcon, LayoutGrid, Maximize } from 'lucide-react';
import { useState } from 'react';
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
  const isMobile = useIsMobile();
  const [gridCols, setGridCols] = useState<number>(isMobile ? 1 : 3);

  // Mapping gridCols to responsive classes
  const layouts = [
    { cols: 1, icon: Maximize, label: 'Single Column' },
    { cols: 3, icon: Grid3x3, label: '3 Columns' },
    { cols: 4, icon: LayoutGrid, label: '4 Columns' }
  ];

  const gridClasses =
    {
      1: 'grid-cols-1',
      3: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3',
      4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'
    }[gridCols as 1 | 3 | 4] || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Content</h2>
        {vaultObjects && vaultObjects.length > 0 && (
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-black text-[10px] opacity-40">
            {vaultObjects.length} of {objectCount} loaded
          </p>
        )}
      </div>
      <div className="flex items-center w-fit gap-1 self-start rounded-2xl bg-secondary/50 p-1 backdrop-blur-md transition-all hover:bg-secondary/70">
        {layouts.map((layout) => (
          <Button
            key={layout.cols}
            variant="ghost"
            size="icon"
            onClick={() => setGridCols(layout.cols)}
            className={cn(
              'h-8 w-8 rounded-xl transition-all duration-300',
              gridCols === layout.cols
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-muted-foreground hover:bg-white/10 hover:text-white'
            )}
            title={layout.label}
          >
            <layout.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      {vaultObjects && vaultObjects.length > 0 ? (
        <InfiniteScrollManager dataLength={vaultObjects.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className={cn('grid gap-4', gridClasses)}>
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
