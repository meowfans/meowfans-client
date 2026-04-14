'use client';

import { useAssets } from '@/hooks/useAssets';
import { AssetType, FileType, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Loading } from '@workspace/ui/globals/Loading';
import { Image as ImageIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { AssetsFilters } from './AssetsFilters';
import { AssetsGrid } from './AssetsGrid';
import { AssetsHeader } from './AssetsHeader';
import { AssetsStats } from './AssetsStats';

import { UploadModal } from './UploadModal';

export function Assets() {
  const [activeType, setActiveType] = useState<string>('ALL');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [fileType] = useState<FileType[]>(Object.values(FileType));

  const queryArgs = useMemo(
    () => ({
      sortBy: SortBy.AssetCreatedAt,
      orderBy: SortOrder.Desc,
      take: 50,
      skip: 0,
      assetType: AssetType.Private,
      fileType: activeType === 'ALL' ? fileType.filter((f) => f === FileType.Image || f === FileType.Video) : [activeType as FileType]
    }),
    [activeType, fileType]
  );

  const { assets, loading, hasMore, handleLoadMore, handleRefetch } = useAssets(queryArgs);

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleDelete = (id: string) => {
    toast.success('Asset deleted (mock)');
    handleRefetch(30);
    setSelectedAssets((prev) => prev.filter((pid) => pid !== id));
  };

  const handleBulkDelete = () => {
    if (selectedAssets.length === 0) return;
    toast.success(`${selectedAssets.length} assets deleted (mock)`);
    handleRefetch(50);
    setSelectedAssets([]);
  };

  const handleClearSelection = () => {
    setSelectedAssets([]);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedAssets((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]));
  };

  const totalAssets = assets.length;
  const imageCount = assets.filter((a) => a.fileType === FileType.Image).length;
  const videoCount = assets.filter((a) => a.fileType === FileType.Video).length;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto">
        <AssetsHeader
          onUpload={handleOpenUploadModal}
          isUploading={isUploading}
          selectedCount={selectedAssets.length}
          onBulkDelete={handleBulkDelete}
          onClearSelection={handleClearSelection}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 mb-4">
        <AssetsStats totalAssets={totalAssets} imageCount={imageCount} videoCount={videoCount} />
      </div>

      <AssetsFilters activeType={activeType} onChangeType={setActiveType} />

      <main className="flex-1">
        <div className="container max-w-7xl mx-auto">
          {loading && assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
              <Loading />
              <p className="text-sm font-medium text-muted-foreground animate-pulse">Scanning your library...</p>
            </div>
          ) : assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
              <div className="p-6 rounded-full bg-muted/30">
                <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-bold">Your library is empty</p>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Start uploading your best media to see them beautifully organized here.
                </p>
              </div>
            </div>
          ) : (
            <div className="pb-20">
              <AssetsGrid
                assets={assets}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onDelete={handleDelete}
                selectedAssets={selectedAssets}
                onToggleSelect={handleToggleSelect}
              />
            </div>
          )}
        </div>
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          handleRefetch(50);
        }}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      />
    </div>
  );
}
