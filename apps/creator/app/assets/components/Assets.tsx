'use client';

import { CreatorGalleryManager } from '@/components/CreatorGalleryManager';
import { DeleteAssetsModal } from '@/components/modals/DeleteAssetsModal';
import { UploadAssetsModal } from '@/components/modals/UploadAssetsModal';
import { UploadPostsModal } from '@/components/modals/UploadPostsModal';
import { useAssets } from '@/hooks/useAssets';
import { useAssetsStore } from '@/zustand/assets.store';
import { AssetType } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { AssetOptions } from './AssetOptions';
import { AssetsHeader } from './AssetsHeader';

export const Assets = () => {
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);
  const { canSelect, selectedAssets, toggleSelect, rangeSelection, setAssets } = useAssetsStore();
  const { assets, handleLoadMore, hasMore, loading, handleRefetch } = useAssets({ assetType });
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

  const handleToggle = (assetId: string, e?: MouseEvent) => {
    e?.stopPropagation();
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
    <PageManager>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
        <AssetsHeader assetType={assetType} setAssetType={setAssetType} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <InfiniteScrollManager dataLength={assets.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
            <CreatorGalleryManager
              getImageUrl={({ asset }) => asset.rawUrl}
              items={assets}
              getKey={({ asset }) => asset.id}
              loading={loading}
              onClick={(item, e) => handleToggle(item.assetId, e)}
              renderOverlay={(creatorAsset, idx, creatorAssets) => (
                <AssetOptions
                  creatorAsset={creatorAsset}
                  idx={idx}
                  isSelectedAsset={selectedAssets.includes(creatorAsset.assetId)}
                  canSelect={canSelect}
                  creatorAssets={creatorAssets}
                  onToggle={(id, e) => handleToggle(id, e)}
                />
              )}
            />
            <UploadPostsModal
              onUpload={() => handleOnUploadAssets(assets.length)}
              selectedAssetsRecord={selectedAssetsRecord}
              assets={assets}
              setSelectedAssetsRecord={setSelectedAssetsRecord}
            />
            <UploadAssetsModal onUpload={(assetsLength) => handleOnUploadAssets(assetsLength)} />
            <DeleteAssetsModal />
          </InfiniteScrollManager>
        </motion.div>
      </motion.div>
    </PageManager>
  );
};
