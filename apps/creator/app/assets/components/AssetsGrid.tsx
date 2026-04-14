'use client';

import { GetCreatorAssetsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { FullscreenViewer } from '@workspace/ui/globals/FullscreenViewer';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { formatDate } from '@workspace/ui/lib/formatters';
import { clamp } from '@workspace/ui/lib/helpers';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AssetCard } from './AssetCard';

interface AssetsGridProps {
  assets: GetCreatorAssetsOutput[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onDelete: (id: string) => void;
  selectedAssets: string[];
  onToggleSelect: (id: string) => void;
}

interface Cols {
  current: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

const BASE_COLS: Cols = {
  current: 3,
  sm: 4,
  md: 5,
  lg: 6,
  xl: 7
};

export function AssetsGrid({ assets, loading, hasMore, onLoadMore, onDelete, selectedAssets, onToggleSelect }: AssetsGridProps) {
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleNativeWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setZoom((prev) => {
          const sensitivity = 0.01;
          const next = prev - e.deltaY * sensitivity;
          return clamp(next, 0.5, 2);
        });
      }
    };

    element.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleNativeWheel);
  }, []);

  const groupedAssets = useMemo(() => {
    return Object.entries(
      assets.reduce<Record<string, GetCreatorAssetsOutput[]>>((acc, asset) => {
        const date = format(new Date(asset.createdAt), 'yyyy-MM-dd');
        acc[date] ??= [];
        acc[date].push(asset);
        return acc;
      }, {})
    );
  }, [assets]);

  const handleAssetClick = (e: React.MouseEvent, asset: GetCreatorAssetsOutput) => {
    e.stopPropagation();

    if (selectedAssets.length > 0) {
      onToggleSelect(asset.id);
    } else {
      setActiveAssetId(asset.id);
    }
  };

  const gridClassNames = useMemo(() => {
    const scale = 1 / zoom;
    const current = Math.round(clamp(BASE_COLS.current * scale, 2, 5));
    const sm = Math.round(clamp(BASE_COLS.sm * scale, 3, 6));
    const md = Math.round(clamp(BASE_COLS.md * scale, 4, 8));
    const lg = Math.round(clamp(BASE_COLS.lg * scale, 5, 10));
    const xl = Math.round(clamp(BASE_COLS.xl * scale, 6, 12));

    return `grid-cols-${current} sm:grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl}`;
  }, [zoom]);

  return (
    <div className="bg-background flex flex-col" ref={containerRef}>
      <InfiniteScrollManager useWindowScroll dataLength={assets.length} loading={loading} hasMore={hasMore} onLoadMore={onLoadMore}>
        <div className="flex flex-col gap-4 pb-20">
          {groupedAssets.map(([date, groupAssets]) => (
            <div key={date}>
              <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/10">
                <h3 className="text-sm font-bold tracking-tight text-muted-foreground uppercase">{formatDate(date)}</h3>
              </div>

              <div className={`grid gap-[2px] ${gridClassNames}`}>
                {groupAssets.map((asset) => {
                  const isSelected = selectedAssets.includes(asset.id);
                  return (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      isSelected={isSelected}
                      onAssetClick={handleAssetClick}
                      onToggleSelect={onToggleSelect}
                      setShowFullScreenIndex={setActiveAssetId}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </InfiniteScrollManager>

      <AnimatePresence>
        {activeAssetId && (
          <motion.div
            className="col-span-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mt-4 relative bg-primary/[0.03] border border-primary/10 rounded-[2rem] md:rounded-[3rem] p-2 md:p-4">
              <div className="absolute top-3 right-3 z-50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveAssetId(null)}
                  className="h-10 w-10 rounded-2xl bg-black/20 hover:bg-black/40 backdrop-blur-xl border border-white/10 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <FullscreenViewer
                items={assets.map((a) => ({ type: a.fileType, url: a.rawUrl }))}
                hasMore={hasMore}
                loadMore={onLoadMore}
                loading={loading}
                initialIndex={assets.findIndex((a) => a.id === activeAssetId)}
                isOpen={!!activeAssetId}
                onClose={() => setActiveAssetId(null)}
                setCurrentlyViewingIndex={() => null}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
