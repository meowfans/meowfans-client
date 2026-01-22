'use client';

import { useAssets } from '@/hooks/useAssets';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import { AssetType, CreatorAssetsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { Modal } from '@workspace/ui/modals/Modal';
import { ImagePlus } from 'lucide-react';
import { useRef } from 'react';
import { CreatorNextImage } from '../CreatorNextImage';

interface AssetPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelectUrl: (creatorAsset: CreatorAssetsEntity) => void;
}

export const AssetPickerModal = ({ open, onClose, onSelectUrl }: AssetPickerModalProps) => {
  const { loading, assets, hasMore, handleLoadMore } = useAssets({
    assetType: AssetType.Private
  });

  // IMPORTANT: this is the actual scroll container in modal
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  const sentinelRef = useInfiniteObserver({
    hasMore,
    loading,
    onLoadMore: handleLoadMore,
    root: scrollRootRef.current
  });

  return (
    <Modal isOpen={open} onClose={onClose} title="Upload from assets" description="Pick an image">
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
              <button key={a.id} onClick={() => onSelectUrl(a)} className="relative aspect-square overflow-hidden rounded-lg border">
                <CreatorNextImage fill imageUrl={a.asset?.rawUrl} alt="Asset" className="object-cover" />
              </button>
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

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
