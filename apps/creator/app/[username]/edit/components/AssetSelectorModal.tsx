'use client';

import { useAssets } from '@/hooks/useAssets';
import { AssetType, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { Modal } from '@workspace/ui/modals/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Image as ImageIcon } from 'lucide-react';
import NextImage from 'next/image';
import { useState } from 'react';

interface AssetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (assetUrl: string) => void;
  selectedUrl?: string;
  title?: string;
  aspectRatio?: 'square' | 'banner';
}

export function AssetSelectorModal({
  isOpen,
  onClose,
  onSelect,
  selectedUrl,
  title = 'Select Image',
  aspectRatio = 'square'
}: AssetSelectorModalProps) {
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);
  const { assets, loading, hasMore, handleLoadMore } = useAssets({
    assetType,
    sortBy: SortBy.AssetCreatedAt,
    orderBy: SortOrder.Desc,
    take: 30,
    skip: 0
  });

  const handleSelectAsset = (url: string) => {
    onSelect(url);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} description="Choose an image from your assets">
      <div className="space-y-4">
        {/* Asset Type Tabs */}
        <Tabs value={assetType} onValueChange={(value) => setAssetType(value as AssetType)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value={AssetType.Private}>Private</TabsTrigger>
            <TabsTrigger value={AssetType.Archive}>Archive</TabsTrigger>
            <TabsTrigger value={AssetType.Hidden}>Hidden</TabsTrigger>
          </TabsList>

          <TabsContent value={assetType} className="mt-4">
            {loading && assets.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                <Loading />
                <p className="text-sm text-muted-foreground">Loading assets...</p>
              </div>
            ) : assets.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 border-2 border-dashed rounded-lg">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium">No assets found</p>
                  <p className="text-xs text-muted-foreground">Upload some images to get started</p>
                </div>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                <InfiniteScrollManager dataLength={assets.length} loading={loading} hasMore={hasMore} onLoadMore={handleLoadMore}>
                  <div
                    className={`grid gap-3 ${aspectRatio === 'banner' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'}`}
                  >
                    <AnimatePresence mode="popLayout">
                      {assets.map((asset, index) => {
                        const isSelected = asset.asset.rawUrl === selectedUrl;
                        return (
                          <motion.div
                            key={asset.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.02, duration: 0.2 }}
                            className="relative group cursor-pointer"
                            onClick={() => handleSelectAsset(asset.asset.rawUrl)}
                          >
                            <div
                              className={`relative ${aspectRatio === 'banner' ? 'aspect-[21/9]' : 'aspect-square'} rounded-lg overflow-hidden border-2 transition-all ${
                                isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <NextImage src={asset.asset.rawUrl} alt="Asset" fill className="object-cover" />

                              {/* Overlay */}
                              <div
                                className={`absolute inset-0 bg-black/50 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                              />

                              {/* Selected Badge */}
                              {isSelected && (
                                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}

                              {/* Asset Type Badge */}
                              <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Badge variant="secondary" className="text-xs">
                                  {asset.type}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {loading && (
                    <div className="flex items-center justify-center p-8">
                      <Loading />
                    </div>
                  )}
                </InfiniteScrollManager>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
