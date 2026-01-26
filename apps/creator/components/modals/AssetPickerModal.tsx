'use client';

import { useAssets } from '@/hooks/useAssets';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import { AssetType, CreatorAssetsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { Modal } from '@workspace/ui/modals/Modal';
import { GalleryThumbnails, ImagePlus } from 'lucide-react';
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
  const { loading, assets, hasMore, handleLoadMore } = useAssets({ assetType });

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

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title="Upload from assets"
      description={
        <div className="flex flex-row justify-center space-x-5 items-center">
          <div>Pick from assets</div>
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
      <div ref={scrollRootRef}>
        {loading && !assets.length && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg" />
            ))}
          </div>
        )}

        {assets.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {assets.map((a) => (
              <div
                key={a.id}
                onClick={() => handleToggle(a)}
                className={`relative aspect-square overflow-hidden rounded-lg border ${selected.some((ca) => ca.assetId === a.assetId) ? 'border-amber-500' : ''}`}
              >
                <CreatorNextImage fill imageUrl={a.asset?.rawUrl} alt="Asset" className="object-cover" />
              </div>
            ))}
          </div>
        )}

        <div ref={sentinelRef} className="h-1" />

        {!loading && !assets.length && (
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
