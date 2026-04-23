'use client';

import { useAssets } from '@/hooks/useAssets';
import { AssetType, FileType, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { VaultCover } from './VaultCover';
import { VaultDetails } from './VaultDetails';
import { VaultStudioAssets } from './VaultStudioAssets';
import { VaultStudioHeader } from './VaultStudioHeader';

export function VaultsStudio() {
  const { errorHandler } = useErrorHandler();
  const [fileType, setFileType] = useState<FileType[]>([FileType.Image, FileType.Video]);
  const { assets, loading, hasMore, handleLoadMore } = useAssets({
    assetType: AssetType.Private,
    sortBy: SortBy.AssetCreatedAt,
    orderBy: SortOrder.Desc,
    fileType,
    take: 30,
    skip: 0
  });

  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [previewAssetId, setPreviewAssetId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [unlockPrice, setUnlockPrice] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleAsset = (assetId: string) => {
    setSelectedAssets((prev) => {
      if (prev.includes(assetId)) {
        if (previewAssetId === assetId) setPreviewAssetId(null);
        return prev.filter((id) => id !== assetId);
      } else {
        if (!previewAssetId) setPreviewAssetId(assetId);
        return [...prev, assetId];
      }
    });
  };

  const handleResetForm = () => {
    setSelectedAssets([]);
    setPreviewAssetId(null);
    setDescription('');
    setUnlockPrice(undefined);
  };

  const handleCreateVault = async () => {
    if (selectedAssets.length === 0) {
      toast.error('Please select at least one asset for the vault');
      return;
    }
    if (!unlockPrice || unlockPrice <= 0) {
      toast.error('Please set a valid unlock price for the vault');
      return;
    }

    setIsSubmitting(true);
    try {
      toast.success('Vault created successfully!', {
        description: 'Your vault is now available for purchase'
      });
      handleResetForm();
    } catch (error) {
      errorHandler({ error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAssetsData = assets.filter((a) => selectedAssets.includes(a.id));
  const previewAsset = selectedAssetsData.find((a) => a.id === previewAssetId);

  return (
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <VaultStudioHeader selectedAssetsLength={selectedAssets.length} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VaultStudioAssets
            assets={assets}
            hasMore={hasMore}
            loading={loading}
            onToggleSelect={handleToggleAsset}
            onLoadMore={handleLoadMore}
            selectedAssets={selectedAssets}
            fileType={fileType}
            onSetFileType={setFileType}
          />
        </div>

        <div className="space-y-4">
          {previewAsset && <VaultCover previewAsset={previewAsset} />}

          <VaultDetails
            description={description}
            unlockPrice={unlockPrice}
            onSetDescription={setDescription}
            onSetUnlockPrice={setUnlockPrice}
          />

          <LoadingButtonV2
            onClick={handleCreateVault}
            disabled={isSubmitting || !selectedAssets.length}
            className="w-full"
            size="lg"
            loading={isSubmitting}
          >
            <Upload className="mr-2 h-4 w-4" />
            Publish Vault
          </LoadingButtonV2>
        </div>
      </div>
    </div>
  );
}
