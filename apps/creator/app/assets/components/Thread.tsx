'use client';

import { DeleteAssetsModal } from '@/components/modals/DeleteAssetsModal';
import { UploadAssetsModal } from '@/components/modals/UploadAssetsModal';
import { UploadPostsModal } from '@/components/modals/UploadPostsModal';
import { useAssets } from '@/hooks/useAssets';
import { AssetType } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { handleFullScreen } from '@workspace/ui/lib';
import { cn } from '@workspace/ui/lib/utils';

import { useAssetsStore } from '@/zustand/assets.store';
import { FileSliders, Fullscreen, LassoIcon, Lock } from 'lucide-react';
import { MouseEvent, useState } from 'react';

interface AssetsThreadProps {
  assetType: AssetType;
  onUpload: () => unknown;
  onDelete: () => unknown;
}

export const AssetsThread: React.FC<AssetsThreadProps> = ({ onUpload, onDelete, assetType }) => {
  const { canSelect, selectedAssets, toggleSelect, rangeSelection, setAssets } = useAssetsStore();
  const { assets, handleLoadMore, hasMore, loading, handleRefetch } = useAssets({ assetType });
  const fullScreenUrls = assets.map((creatorAsset) => creatorAsset.asset.rawUrl) || [];
  const [selectedAssetsRecord, setSelectedAssetsRecord] = useState<{ id: string; url: string }[]>([]);

  const handleSelectRange = (fromId: string, toId: string) => {
    if (!assets.length) return;
    const fromIndex = assets.findIndex((asset) => asset.assetId === fromId);
    const toIndex = assets.findIndex((asset) => asset.assetId === toId);
    if (fromIndex === -1 || toIndex === -1) return;

    const [start, end] = fromIndex < toIndex ? [fromIndex, toIndex] : [toIndex, fromIndex];
    const rangeAssets = assets.slice(start, end + 1);
    const rangeIds = rangeAssets.map((a) => a.assetId);

    useAssetsStore.setState((state) => ({
      selectedAssets: Array.from(new Set([...state.selectedAssets, ...rangeIds]))
    }));
  };

  const handleToggle = (assetId: string, e: MouseEvent) => {
    e.stopPropagation();
    if (selectedAssets.includes(assetId)) toggleSelect(assetId);
    else if (rangeSelection && canSelect) {
      if (selectedAssets.length > 0) {
        const lastSelected = selectedAssets[selectedAssets.length - 1];
        handleSelectRange(lastSelected, assetId);
      } else {
        toggleSelect(assetId);
      }
    } else if (canSelect) {
      toggleSelect(assetId);
    }
  };

  const handleOnUploadAssets = async (newAssetsLength: number) => {
    const newAssets = await handleRefetch(newAssetsLength);
    setAssets([...newAssets, ...assets]);
  };

  return (
    <div className="flex flex-row justify-between gap-2 m-2">
      <InfiniteScrollManager dataLength={assets.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
        <ScrollArea className="w-full">
          <div className="grid gap-2 grid-cols-2 md:grid-cols-5">
            {assets.map((creatorAsset, idx) => {
              const isSelected = selectedAssets.includes(creatorAsset.assetId);

              return (
                <div
                  key={creatorAsset.id}
                  className={cn(
                    'relative flex rounded-lg overflow-hidden transition-transform duration-200 hover:scale-[1.02]',
                    isSelected && 'ring-2 ring-blue-400 shadow-lg'
                  )}
                >
                  {canSelect ? (
                    <div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                          'absolute top-1 left-1 backdrop-blur-sm bg-black/30 hover:bg-white/10 rounded-md text-white',
                          isSelected && 'bg-blue-600 hover:bg-blue-700'
                        )}
                        onClick={(e) => handleToggle(creatorAsset.assetId, e)}
                      >
                        <LassoIcon size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-1 right-1 backdrop-blur-sm bg-black/30 hover:bg-white/10 text-white rounded-md"
                      >
                        <Lock size={18} />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button className="absolute top-1 left-1 bg-black/30 hover:bg-white/10 text-white rounded-md" size="icon">
                        <FileSliders size={18} />
                      </Button>
                      <Button
                        className="absolute top-1 right-1 bg-black/30 hover:bg-white/10 text-white rounded-md"
                        size="icon"
                        onClick={() => handleFullScreen(creatorAsset.asset.rawUrl, idx, fullScreenUrls)}
                      >
                        <Fullscreen size={18} />
                      </Button>
                    </div>
                  )}

                  {isSelected && <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-[1px] pointer-events-none" />}

                  <div
                    onClick={(e) => handleToggle(creatorAsset.assetId, e)}
                    style={{ backgroundImage: `url(${creatorAsset.asset.rawUrl})` }}
                    className="aspect-square bg-cover bg-center h-fit w-full bg-no-repeat rounded-lg"
                  />

                  <Badge
                    className={cn(
                      'absolute bottom-1 right-1 text-xs font-semibold shadow-md',
                      creatorAsset.asset.isPosted ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'
                    )}
                  >
                    {creatorAsset.asset.isPosted ? 'POSTED' : 'IN QUEUE'}
                  </Badge>

                  <Badge className="absolute bottom-1 left-1 text-xs bg-purple-500/90 text-white shadow-md">{creatorAsset.type}</Badge>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </InfiniteScrollManager>

      <UploadPostsModal
        onUpload={onUpload}
        selectedAssetsRecord={selectedAssetsRecord}
        assets={assets}
        setSelectedAssetsRecord={setSelectedAssetsRecord}
      />
      <UploadAssetsModal onUpload={(assetsLength) => handleOnUploadAssets(assetsLength)} />
      <DeleteAssetsModal onDelete={onDelete} />
    </div>
  );
};
