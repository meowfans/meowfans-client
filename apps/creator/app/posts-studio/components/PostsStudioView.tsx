'use client';

import { useAssets } from '@/hooks/useAssets';
import { usePostsActions } from '@workspace/gql/actions/posts.actions';
import { AssetType, CreatePostInput, FileType, PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
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
import { Check, DollarSign, Eye, EyeOff, Image as ImageIcon, Lock, Sparkles, Upload } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export function PostsStudioView() {
  const { errorHandler } = useErrorHandler();
  const { createPostQuery } = usePostsActions();
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);
  const {
    assets: creatorAssets,
    loading,
    hasMore,
    handleLoadMore
  } = useAssets({
    assetType,
    sortBy: SortBy.AssetCreatedAt,
    orderBy: SortOrder.Desc,
    take: 30,
    skip: 0
  });

  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [previewAssetId, setPreviewAssetId] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [postType, setPostType] = useState<PostTypes>(PostTypes.Exclusive);
  const [unlockPrice, setUnlockPrice] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleAsset = (assetId: string) => {
    setSelectedAssets((prev) => {
      if (prev.includes(assetId)) {
        // If removing and it was the preview, clear preview
        if (previewAssetId === assetId) {
          setPreviewAssetId(null);
        }
        return prev.filter((id) => id !== assetId);
      } else {
        // If adding and no preview set, make it the preview
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

  const handleCreatePost = async () => {
    if (selectedAssets.length === 0) {
      toast.error('Please select at least one asset');
      return;
    }

    setIsSubmitting(true);
    try {
      const input: CreatePostInput = {
        assetIds: selectedAssets,
        caption: caption || undefined,
        previewId: previewAssetId || undefined,
        type: postType,
        unlockPrice: postType === PostTypes.Exclusive ? unlockPrice : undefined
      };

      await createPostQuery(input);

      toast.success('Post created successfully!', {
        description: 'Your post is now live'
      });

      // Reset form
      setSelectedAssets([]);
      setPreviewAssetId(null);
      setCaption('');
      setPostType(PostTypes.Public);
      setUnlockPrice(undefined);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAssetsData = creatorAssets.filter((a) => selectedAssets.includes(a.assetId));
  const previewAsset = selectedAssetsData.find((a) => a.assetId === previewAssetId);

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
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            <span className="truncate">Posts Studio</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Create and share your content with your audience</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm" asChild>
            <Link href="/posts">Manage Posts</Link>
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
              <CardTitle>Select Assets</CardTitle>
              <CardDescription>Choose images or videos for your post</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={assetType} onValueChange={(value) => setAssetType(value as AssetType)} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value={AssetType.Private}>Private</TabsTrigger>
                  <TabsTrigger value={AssetType.Archive}>Archive</TabsTrigger>
                  <TabsTrigger value={AssetType.Hidden}>Hidden</TabsTrigger>
                </TabsList>

                <TabsContent value={assetType} className="mt-4">
                  {loading && creatorAssets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-75 gap-4">
                      <Loading />
                      <p className="text-sm text-muted-foreground">Loading assets...</p>
                    </div>
                  ) : creatorAssets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-75 gap-4 border-2 border-dashed rounded-lg">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      <div className="text-center space-y-1">
                        <p className="text-sm font-medium">No assets found</p>
                        <p className="text-xs text-muted-foreground">Upload some images to get started</p>
                      </div>
                    </div>
                  ) : (
                    <div id="infinite-scroll-div" className="max-h-150 overflow-y-auto">
                      <InfiniteScrollManager
                        dataLength={creatorAssets.length}
                        loading={loading}
                        hasMore={hasMore}
                        scrollableDiv="infinite-scroll-div"
                        onLoadMore={handleLoadMore}
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          <AnimatePresence mode="popLayout">
                            {creatorAssets.map((asset, index) => {
                              const isSelected = selectedAssets.includes(asset.assetId);
                              const isPreview = previewAssetId === asset.assetId;
                              return (
                                <motion.div
                                  key={asset.id}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.02, duration: 0.2 }}
                                  className="relative group cursor-pointer"
                                  onClick={() => handleToggleAsset(asset.assetId)}
                                >
                                  <div
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                      isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'border-border hover:border-primary/50'
                                    }`}
                                  >
                                    {asset.asset.fileType === FileType.Video ? (
                                      <video
                                        src={asset.asset.rawUrl}
                                        controls
                                        autoPlay
                                        className="w-full h-full max-h-[70vh] object-contain"
                                      />
                                    ) : (
                                      <div className="relative w-full h-[60vh]">
                                        <NextImage src={asset.asset.rawUrl} alt="Full Preview" fill className="object-contain" priority />
                                      </div>
                                    )}

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
                                        PREVIEW
                                      </div>
                                    )}

                                    {/* Set as Preview Button */}
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
                                          <Eye className="h-3 w-3 mr-1" />
                                          Set as Preview
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

        {/* Post Configuration */}
        <div className="space-y-4">
          {/* Preview */}
          {previewAsset && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <NextImage src={previewAsset.asset.rawUrl} alt="Preview" fill className="object-cover" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Caption */}
          <Card>
            <CardHeader>
              <CardTitle>Caption</CardTitle>
              <CardDescription>Add a description to your post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Write your caption here..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">{caption.length} characters</p>
              </div>
            </CardContent>
          </Card>

          {/* Post Type */}
          <Card>
            <CardHeader>
              <CardTitle>Post Type</CardTitle>
              <CardDescription>Choose who can see this post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={postType === PostTypes.Public ? 'default' : 'outline'}
                  onClick={() => setPostType(PostTypes.Public)}
                  className="flex flex-col h-auto py-3"
                >
                  <Eye className="h-5 w-5 mb-1" />
                  <span className="text-xs">Public</span>
                </Button>
                <Button
                  variant={postType === PostTypes.Exclusive ? 'default' : 'outline'}
                  onClick={() => setPostType(PostTypes.Exclusive)}
                  className="flex flex-col h-auto py-3"
                >
                  <Lock className="h-5 w-5 mb-1" />
                  <span className="text-xs">Exclusive</span>
                </Button>
                <Button
                  variant={postType === PostTypes.Private ? 'default' : 'outline'}
                  onClick={() => setPostType(PostTypes.Private)}
                  className="flex flex-col h-auto py-3"
                >
                  <EyeOff className="h-5 w-5 mb-1" />
                  <span className="text-xs">Private</span>
                </Button>
                <Button
                  variant={postType === PostTypes.Hidden ? 'default' : 'outline'}
                  onClick={() => setPostType(PostTypes.Hidden)}
                  className="flex flex-col h-auto py-3"
                >
                  <EyeOff className="h-5 w-5 mb-1" />
                  <span className="text-xs">Hidden</span>
                </Button>
              </div>

              {/* Unlock Price for Exclusive */}
              {postType === PostTypes.Exclusive && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                  <Label htmlFor="unlockPrice">Unlock Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="unlockPrice"
                      type="number"
                      placeholder="0.00"
                      value={unlockPrice || ''}
                      onChange={(e) => setUnlockPrice(e.target.value ? Number(e.target.value) : undefined)}
                      className="pl-9"
                      min={0}
                      step={0.01}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Set a price for users to unlock this post</p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Publish Button */}
          <Button onClick={handleCreatePost} disabled={isSubmitting || selectedAssets.length === 0} className="w-full" size="lg">
            {isSubmitting ? (
              <>
                <Loading />
                <span className="ml-2">Creating...</span>
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Publish Post
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
