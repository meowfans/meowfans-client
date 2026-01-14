'use client';

import { useAssets } from '@/hooks/useAssets';
import { AssetType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Modal } from '@workspace/ui/modals/Modal';
import { ImagePlus } from 'lucide-react';
import { CreatorNextImage } from '../CreatorNextImage';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectUrl: (url: string) => void;
}

export const AssetPickerModal: React.FC<Props> = ({ open, onClose, onSelectUrl }) => {
  const { loading, assets, hasMore, handleLoadMore } = useAssets({ assetType: AssetType.Private });

  return (
    <Modal isOpen={open} onClose={onClose} title="Send from assets" description="Pick an image to attach to this message">
      <div className="space-y-3">
        {loading ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg" />
            ))}
          </div>
        ) : !assets.length ? (
          <InfiniteScrollManager dataLength={assets.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {assets.map((a) => {
                const url = a?.asset?.rawUrl;
                return (
                  <div
                    key={a.id}
                    className="group relative aspect-square overflow-hidden rounded-lg border bg-muted/10"
                    onClick={() => onSelectUrl(url)}
                  >
                    <CreatorNextImage
                      fill
                      imageUrl={url}
                      alt="Asset"
                      className="object-cover transition-transform group-hover:scale-[1.03]"
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScrollManager>
        ) : (
          <Card className="bg-background/70 backdrop-blur">
            <div className="flex items-center gap-3 p-4">
              <div className="rounded-lg border bg-background/70 p-2">
                <ImagePlus className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium">No assets found</p>
                <p className="text-xs text-muted-foreground">Upload some media in Assets first.</p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
