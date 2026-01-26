'use client';

import { useAssets } from '@/hooks/useAssets';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import { AssetType, CreatorAssetsEntity, FileType } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { FullScreenButton } from '@workspace/ui/globals/FullScreenButton';
import { Modal } from '@workspace/ui/modals/Modal';
import { GalleryThumbnails, ImagePlus, Notebook, Video, Volume } from 'lucide-react';
import { useRef, useState } from 'react';
import { CreatorNextImage } from '../CreatorNextImage';

interface AssetPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelectUrls: (creatorAssets: CreatorAssetsEntity[]) => void;
}

export const AssetPickerModal = ({ open, onClose, onSelectUrls }: AssetPickerModalProps) => {
  const [selected, setSelected] = useState<CreatorAssetsEntity[]>([]);
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);
  const [fileType, setFileType] = useState<FileType[]>([FileType.Image, FileType.Video]);
  const { loading, assets, hasMore, handleLoadMore } = useAssets({ assetType, fileType });

  // IMPORTANT: this is the actual scroll container in modal
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  const sentinelRef = useInfiniteObserver({
    hasMore,
    loading,
    onLoadMore: handleLoadMore,
    root: scrollRootRef.current
  });

  const handleToggle = (creatorAsset: CreatorAssetsEntity) => {
    setSelected((prev) => {
      const isSelected = prev.some((ca) => ca.assetId === creatorAsset.assetId);
      return isSelected ? prev.filter((ca) => ca.assetId !== creatorAsset.assetId) : [...prev, creatorAsset];
    });
  };

  const handleAttach = () => {
    onSelectUrls(selected);
    onClose();
  };

  const handleClose = () => {
    setSelected([]);
    onClose();
  };

  const fileTypeMap = {
    [FileType.Image]: <GalleryThumbnails />,
    [FileType.Video]: <Video />,
    [FileType.Audio]: <Volume />,
    [FileType.Document]: <Notebook />
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title="Upload from assets"
      description="Pick from assets"
      footerContent={
        <div className="flex flex-row justify-center space-x-5 items-center">
          <Dropdown
            enumValue={AssetType}
            filterBy={assetType}
            onFilterBy={(val) => setAssetType(val)}
            trigger={{ icon: GalleryThumbnails, label: assetType }}
            label="Change asset type"
            title="Assets type changer"
          />
          <Button variant="default" disabled={!selected.length} onClick={handleAttach} className="cursor-pointer">
            Attach {selected.length > 0 && `(${selected.length})`}
          </Button>
        </div>
      }
    >
      <div ref={scrollRootRef} />
      <div id="asset-picker-scroll" className="flex-1 overflow-y-auto px-4 py-3">
        {loading ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg" />
            ))}
          </div>
        ) : assets.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {assets.map((asset, idx) => (
              <div
                key={asset.id}
                onClick={() => handleToggle(asset)}
                className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer ${
                  selected.some((a) => a.assetId === asset.assetId) ? 'border-amber-500' : ''
                }`}
              >
                {asset.asset.fileType === FileType.Image ? (
                  <CreatorNextImage fill imageUrl={asset.asset.rawUrl} alt="Asset" className="object-cover" />
                ) : (
                  <video src={asset.asset.rawUrl} muted className="w-full h-full object-cover" />
                )}
                <Badge variant={'secondary'} className="absolute top-0 right-0 p-1 m-0">
                  {fileTypeMap[asset.asset.fileType]}
                </Badge>
                <FullScreenButton
                  currentIdx={idx}
                  urls={assets.map(({ asset }) => asset.rawUrl)}
                  className="absolute top-0 left-0 p-0 m-0"
                  currentUrl={asset.asset.rawUrl}
                  size="icon"
                  filetype={asset.asset.fileType === FileType.Image ? 'img' : 'video'}
                />
              </div>
            ))}
            <div ref={sentinelRef} className="h-1" />
          </div>
        ) : (
          <Card>
            <div className="flex items-center gap-3 p-4">
              <ImagePlus className="h-4 w-4" />
              <p className="text-sm">No assets found</p>
            </div>
          </Card>
        )}
      </div>
    </Modal>
  );
};
