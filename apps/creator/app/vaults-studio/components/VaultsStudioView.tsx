'use client';

import { useAssets } from '@/hooks/useAssets';
import { AssetType, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Textarea } from '@workspace/ui/components/textarea';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, DollarSign, FolderLock, Image as ImageIcon, Sparkles, Upload } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export function VaultsStudioView() {
  const { errorHandler } = useErrorHandler();
  // const { createVaultQuery } = useVaultsActions(); // TODO: Implement createVaultQuery when available
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);
  const { assets, loading, hasMore, handleLoadMore } = useAssets({
    assetType,
    sortBy: SortBy.AssetCreatedAt,
    orderBy: SortOrder.Desc,
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
        if (previewAssetId === assetId) {
          setPreviewAssetId(null);
        }
        return prev.filter((id) => id !== assetId);
      } else {
        if (!previewAssetId) {
          setPreviewAssetId(assetId);
        }
        return [...prev, assetId];
      }
    });
  };

  const handleSetPreview = (assetId: string) => {
    if (selectedAssets.includes(assetId)) {
      setPreviewAssetId(assetId);
    }
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
      // Mock submission for now as mutation is missing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      /*
      const input: CreateVaultInput = {
        assetIds: selectedAssets,
        description: description || undefined,
        previewId: previewAssetId || undefined,
        unlockPrice: unlockPrice
      };
      await createVaultQuery(input);
      */

      toast.success('Vault created successfully!', {
        description: 'Your vault is now available for purchase'
      });

      // Reset form
      setSelectedAssets([]);
      setPreviewAssetId(null);
      setDescription('');
      setUnlockPrice(undefined);
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <FolderLock className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            <span className="truncate">Vaults Studio</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Create exclusive collections and maximize your earnings</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm" asChild>
            <Link href="/vaults">Manage Vaults</Link>
          </Button>
          <Badge variant="secondary" className="text-xs sm:text-sm whitespace-nowrap">
            {selectedAssets.length} selected
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Selection */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Content</CardTitle>
              <CardDescription>Choose assets to include in this vault</CardDescription>
            </CardHeader>
            <CardContent>
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
                    <div className="max-h-[600px] overflow-y-auto">
                      <InfiniteScrollManager dataLength={assets.length} loading={loading} hasMore={hasMore} onLoadMore={handleLoadMore}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          <AnimatePresence mode="popLayout">
                            {assets.map((asset, index) => {
                              const isSelected = selectedAssets.includes(asset.id);
                              const isPreview = previewAssetId === asset.id;
                              return (
                                <motion.div
                                  key={asset.id}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.02, duration: 0.2 }}
                                  className="relative group cursor-pointer"
                                  onClick={() => handleToggleAsset(asset.id)}
                                >
                                  <div
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
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

                                    {/* Preview Badge */}
                                    {isPreview && (
                                      <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs font-bold">
                                        COVER
                                      </div>
                                    )}

                                    {/* Set as Cover Button */}
                                    {isSelected && !isPreview && (
                                      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                          size="sm"
                                          variant="secondary"
                                          className="w-full text-xs"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSetPreview(asset.id);
                                          }}
                                        >
                                          <Sparkles className="h-3 w-3 mr-1" />
                                          Set Cover
                                        </Button>
                                      </div>
                                    )}
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
            </CardContent>
          </Card>
        </div>

        {/* Configuration */}
        <div className="space-y-4">
          {/* Cover Preview */}
          {previewAsset && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Vault Cover</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <NextImage src={previewAsset.asset.rawUrl} alt="Cover" fill className="object-cover" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Vault Details</CardTitle>
              <CardDescription>Configure your exclusive collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What's inside this vault?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Vault Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={unlockPrice || ''}
                    onChange={(e) => setUnlockPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="pl-9"
                    min={0}
                    step={0.01}
                  />
                </div>
                <p className="text-xs text-muted-foreground">One-time purchase price for this collection</p>
              </div>
            </CardContent>
          </Card>

          {/* Action */}
          <Button onClick={handleCreateVault} disabled={isSubmitting || selectedAssets.length === 0} className="w-full" size="lg">
            {isSubmitting ? (
              <>
                <Loading />
                <span className="ml-2">Creating...</span>
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Publish Vault
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
