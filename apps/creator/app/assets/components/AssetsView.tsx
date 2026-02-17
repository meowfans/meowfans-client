'use client';

import { useAssets } from '@/hooks/useAssets';
import { AssetsEntity, AssetType, FileType, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Loading } from '@workspace/ui/globals/Loading';
import { Modal } from '@workspace/ui/modals/Modal';
import { Image as ImageIcon } from 'lucide-react';
import NextImage from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { AssetsFilters } from './AssetsFilters';
import { AssetsGrid } from './AssetsGrid';
import { AssetsHeader } from './AssetsHeader';
import { AssetsStats } from './AssetsStats';

import { UploadModal } from './UploadModal';

export function AssetsView() {
  const [activeType, setActiveType] = useState<string>('ALL');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [previewAsset, setPreviewAsset] = useState<AssetsEntity | null>(null);

  const params: PaginationInput = {
    sortBy: SortBy.AssetCreatedAt,
    orderBy: SortOrder.Desc,
    take: 30,
    skip: 0,
    assetType: AssetType.Private,
    fileType: activeType === 'ALL' ? undefined : [activeType as FileType]
  };

  const { assets, loading, hasMore, handleLoadMore, handleRefetch } = useAssets(params);

  const handleUploadFiles = async (files: File[]) => {
    setIsUploading(true);
    // Mock upload simulating API delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // In real implementation: loop files and upload
      toast.success(`${files.length} asset(s) uploaded successfully`);
      handleRefetch(30);
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
      setIsUploadModalOpen(false);
    }
  };

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      toast.success('Asset deleted (mock)');
      handleRefetch(30);
      setSelectedAssets((prev) => prev.filter((pid) => pid !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedAssets.length === 0) return;
    if (confirm(`Delete ${selectedAssets.length} assets?`)) {
      toast.success(`${selectedAssets.length} assets deleted (mock)`);
      handleRefetch(30);
      setSelectedAssets([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedAssets((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]));
  };

  const handleView = (asset: AssetsEntity) => {
    setPreviewAsset(asset);
  };

  const totalAssets = assets.length;
  // Use optional chaining and fallback for safety, in case asset is null/undefined though typed otherwise
  const imageCount = assets.filter((a) => a.asset?.fileType === FileType.Image).length;
  const videoCount = assets.filter((a) => a.asset?.fileType === FileType.Video).length;

  return (
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <AssetsHeader
        onUpload={handleOpenUploadModal}
        isUploading={isUploading}
        selectedCount={selectedAssets.length}
        onBulkDelete={handleBulkDelete}
      />

      <AssetsStats totalAssets={totalAssets} imageCount={imageCount} videoCount={videoCount} />

      <Card>
        <AssetsFilters activeType={activeType} onChangeType={setActiveType} />
        <CardContent className="p-0 sm:p-0">
          {loading && assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-75 gap-4">
              <Loading />
              <p className="text-sm text-muted-foreground">Loading assets...</p>
            </div>
          ) : assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-75 gap-4">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">No assets found</p>
                <p className="text-xs text-muted-foreground">Upload some media to get started</p>
              </div>
            </div>
          ) : (
            <AssetsGrid
              assets={assets}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              onDelete={handleDelete}
              onView={handleView}
              selectedAssets={selectedAssets}
              onToggleSelect={handleToggleSelect}
            />
          )}
        </CardContent>
      </Card>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadFiles}
        isUploading={isUploading}
      />

      {/* Fullscreen Preview Modal */}
      {previewAsset && (
        <Modal
          isOpen={!!previewAsset}
          onClose={() => setPreviewAsset(null)}
          title="Asset Preview"
          description={`Created on ${new Date(previewAsset.createdAt).toLocaleDateString()}`}
        >
          <div className="relative w-full overflow-hidden rounded-lg bg-black flex items-center justify-center min-h-[50vh] max-h-[80vh]">
            {previewAsset.fileType === FileType.Video ? (
              <video src={previewAsset.rawUrl} controls autoPlay className="w-full h-full max-h-[70vh] object-contain" />
            ) : (
              <div className="relative w-full h-[60vh]">
                <NextImage src={previewAsset.rawUrl} alt="Full Preview" fill className="object-contain" priority />
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <a href={previewAsset.rawUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
              Open original in new tab
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
}
