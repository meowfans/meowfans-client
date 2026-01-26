'use client';

import { CreatorGalleryManager } from '@/components/CreatorGalleryManager';
import { DeleteAssetsModal } from '@/components/modals/DeleteAssetsModal';
import { UploadAssetsModal } from '@/components/modals/UploadAssetsModal';
import { UploadPostsModal } from '@/components/modals/UploadPostsModal';
import { useAssetsStore } from '@/hooks/store/assets.store';
import { useAssets } from '@/hooks/useAssets';
import { AssetType, FileType, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';
import { AssetOptions } from './AssetOptions';
import { AssetsHeader } from './AssetsHeader';

export const Assets = () => {
  const searchParams = useSearchParams();
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [fileType, setFiletype] = useState<FileType[]>([FileType.Image, FileType.Video]);
  const { assets, handleLoadMore, hasMore, loading, handleRefetch } = useAssets({ assetType, orderBy, fileType });
  const [selectedAssetsRecord, setSelectedAssetsRecord] = useState<{ id: string; url: string }[]>([]);
  const { canSelect, selectedAssets, toggleSelect, rangeSelection, setAssets, setSelectedAssets, setRangeSelection, setCanSelect } =
    useAssetsStore();

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

  const handleDoneUploading = () => {
    setCanSelect(false);
    setRangeSelection(false);
    setSelectedAssets([]);
  };

  const handleOnUploadAssets = async (newAssetsLength: number) => {
    const newAssets = await handleRefetch(newAssetsLength);
    setAssets([...newAssets, ...assets]);
    handleDoneUploading();
  };

  useEffect(() => {
    if (searchParams.has('create-post')) {
      setRangeSelection(true);
      setCanSelect(true);
    }
  }, []); // eslint-disable-line

  return (
    <PageManager>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
        <AssetsHeader
          assetType={assetType}
          setAssetType={setAssetType}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          fileType={fileType}
          setFileType={setFiletype}
        />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <InfiniteScrollManager dataLength={assets.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
            <CreatorGalleryManager
              items={assets}
              loading={loading}
              getKey={({ asset }) => asset.id}
              getUrl={({ asset }) => asset.rawUrl}
              getFileType={(item) => item.asset.fileType}
              onClick={(item, e) => handleToggle(item.assetId, e)}
              renderOverlay={(creatorAsset, idx, creatorAssets) => (
                <AssetOptions
                  idx={idx}
                  canSelect={canSelect}
                  creatorAsset={creatorAsset}
                  creatorAssets={creatorAssets}
                  onToggle={(id, e) => handleToggle(id, e)}
                  isSelectedAsset={selectedAssets.includes(creatorAsset.assetId)}
                />
              )}
            />
            <UploadPostsModal
              assets={assets}
              onUpload={handleDoneUploading}
              selectedAssetsRecord={selectedAssetsRecord}
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
