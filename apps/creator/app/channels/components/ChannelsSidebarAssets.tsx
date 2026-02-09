'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { useAssets } from '@/hooks/useAssets';
import { AssetsEntity, AssetType, FileType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Check, Search, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function ChannelsSidebarAssets() {
  const { setShowAssetsSidebar, selectedAssets, setSelectedAssets } = useUtilsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypes, setFileTypes] = useState<FileType[]>(Object.values(FileType));
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { assets, loading, hasMore, handleLoadMore } = useAssets({
    take: 20,
    searchTerm: debouncedSearch || undefined,
    fileType: fileTypes,
    assetType: AssetType.Private
  });

  const toggleAssetSelection = (asset: AssetsEntity) => {
    setSelectedAssets((prev) => {
      const isAlreadySelected = prev.some((a) => a.id === asset.id);
      if (isAlreadySelected) {
        return prev.filter((a) => a.id !== asset.id);
      }
      return [...prev, asset];
    });
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background">
      <div className="p-4 border-b bg-card backdrop-blur-md sticky top-0 z-30 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAssetsSidebar(false)}
              className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-extrabold tracking-tight">Pick Assets</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAssetsSidebar(false)}
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            Cancel
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 text-xs rounded-full bg-muted/50 border-none focus-visible:ring-primary/20"
          />
        </div>

        {/* Selected Preview Inside Picker */}
        {selectedAssets.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none animate-in fade-in slide-in-from-top-1 duration-200">
            {selectedAssets.map((asset, idx) => (
              <div key={asset.id} className="relative shrink-0">
                <div className="h-12 w-12 rounded-lg overflow-hidden border border-primary/20 bg-muted">
                  {asset.fileType === FileType.Image ? (
                    <Image width={48} height={48} src={asset.rawUrl} alt="Selected" className="h-full w-full object-cover" />
                  ) : (
                    <video src={asset.rawUrl} className="h-full w-full object-cover" />
                  )}
                </div>
                <button
                  onClick={() => toggleAssetSelection(asset)}
                  className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-0.5 shadow-lg"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0">
        {loading && assets.length === 0 ? (
          <div className="grid grid-cols-2 gap-2 p-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg" />
            ))}
          </div>
        ) : assets.length > 0 ? (
          <InfiniteScrollManager dataLength={assets.length} onLoadMore={handleLoadMore} hasMore={hasMore} loading={loading}>
            <div className="grid grid-cols-2 gap-2 p-2 pb-10">
              {assets.map((asset) => {
                const isSelected = selectedAssets.find((a) => a.id === asset.asset.id);
                return (
                  <div
                    key={asset.id}
                    onClick={() => toggleAssetSelection(asset.asset)}
                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group border-2 transition-all ${
                      isSelected ? 'border-primary ring-2 ring-primary/10' : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    {asset.asset.fileType === FileType.Image ? (
                      <Image fill src={asset.asset.rawUrl} alt="Asset" className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                    ) : (
                      <video src={asset.asset.rawUrl} className="w-full h-full object-cover" />
                    )}

                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity ${isSelected ? 'bg-primary/20' : 'bg-black/0 group-hover:bg-black/10'}`}
                    />

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-sm">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </InfiniteScrollManager>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <p className="text-sm">No assets found</p>
          </div>
        )}
      </div>
      {selectedAssets.length > 0 ? (
        <div className="p-4 border-t bg-card sticky bottom-0 z-30 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-full duration-300 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold">{selectedAssets.length} selected</p>
            <p className="text-[10px] text-muted-foreground truncate">Items will be attached to your message</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setSelectedAssets([])} className="h-10 px-3 text-xs text-destructive">
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => setShowAssetsSidebar(false)}
              className="h-10 px-6 text-xs font-bold rounded-full shadow-lg shadow-primary/20"
            >
              Done Pick
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 border-t bg-card/50 backdrop-blur-md sticky bottom-0 z-30 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden">
          <Button
            variant="outline"
            onClick={() => setShowAssetsSidebar(false)}
            className="w-full h-11 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            Back to Chat
          </Button>
        </div>
      )}
    </div>
  );
}
