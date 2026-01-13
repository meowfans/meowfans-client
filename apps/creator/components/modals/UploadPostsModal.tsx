'use client';

import { useOnPostsUploadMutation } from '@/hooks/usePosts';
import { CreatorAssetsEntity, PostTypes } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Textarea } from '@workspace/ui/components/textarea';
import { Modal } from '@workspace/ui/modals/Modal';

import { useAssetsStore } from '@/hooks/store/assets.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { motion } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';

interface UploadPostsModalProps {
  assets: CreatorAssetsEntity[];
  selectedAssetsRecord: { id: string; url: string }[];
  onUpload: () => unknown;
  setSelectedAssetsRecord: React.Dispatch<React.SetStateAction<{ id: string; url: string }[]>>;
}

export const UploadPostsModal: React.FC<UploadPostsModalProps> = ({ onUpload, selectedAssetsRecord, setSelectedAssetsRecord, assets }) => {
  const { errorHandler } = useErrorHandler();
  const { openPostCreateModal, setOpenPostCreateModal } = usePostsStore();
  const [postTypes, setPostTypes] = useState<PostTypes>(PostTypes.Exclusive);
  const [unlockPrice, setUnlockPrice] = useState<number>(300);
  const { selectedAssets, setSelectedAssets, setAssets, assets: creatorAssets } = useAssetsStore();
  const [caption, setCaption] = useState<string>('Describe post details');
  const [previewId, setPreviewId] = useState<string>('');

  const { handleUploadPosts, loading, setLoading } = useOnPostsUploadMutation();

  const handleUpload = async () => {
    if (!selectedAssetsRecord.length) return;
    try {
      await handleUploadPosts({
        assetIds: selectedAssetsRecord.map((a) => a.id),
        types: [postTypes],
        caption,
        previewId,
        unlockPrice
      });
      onUpload();
      setAssets(
        creatorAssets.map((c) =>
          selectedAssetsRecord.some((a) => a.id === c.assetId) ? { ...c, asset: { ...c.asset, isPosted: true } } : c
        )
      );
    } catch (error) {
      errorHandler({ error, msg: 'Failed to upload post' });
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    if (postTypes.includes(PostTypes.Public)) setUnlockPrice(0);
  }, [postTypes]);

  const handleRemoveAsset = (assetId: string) => {
    setSelectedAssetsRecord((prev) => prev.filter((a) => a.id !== assetId));
    setSelectedAssets(selectedAssets.filter((id) => id !== assetId));
    if (previewId === assetId && selectedAssetsRecord.length > 1) {
      setPreviewId(selectedAssetsRecord.find((a) => a.id !== assetId)?.id || '');
    }
  };

  const handleClose = () => {
    setLoading(false);
    setSelectedAssetsRecord([]);
    setSelectedAssets([]);
    setCaption('');
    setPreviewId('');
    setUnlockPrice(300);
    setPostTypes(PostTypes.Exclusive);
    setOpenPostCreateModal(false);
  };

  useEffect(() => {
    setSelectedAssetsRecord(
      selectedAssets
        .map((id) => {
          const asset = assets.find((a) => a.assetId === id);
          return asset ? { id: asset.assetId, url: asset.asset.rawUrl } : null;
        })
        .filter((a): a is { id: string; url: string } => a !== null)
    );
  }, [selectedAssets, assets]); //eslint-disable-line

  return (
    <Modal
      isOpen={openPostCreateModal}
      onClose={handleClose}
      description="Set details, choose preview, and upload your post."
      title="Upload post"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Post Type</Label>
            <Select value={postTypes} onValueChange={(v) => setPostTypes(v as PostTypes)}>
              <SelectTrigger>
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PostTypes).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Unlock Price (₹)</Label>
            <Input type="number" min={0} value={unlockPrice} onChange={(e) => setUnlockPrice(Number(e.target.value))} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Caption</Label>
          <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Describe your post..." className="min-h-20" />
        </div>

        <div className="space-y-1.5">
          <Label>Assets</Label>
          <ScrollArea className="max-h-80 mt-2 rounded-lg border overflow-y-scroll p-2">
            <div className="grid grid-cols-3 gap-3">
              {selectedAssetsRecord.map((asset) => {
                const isPreview = asset.id === previewId;
                return (
                  <motion.div
                    key={asset.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative group rounded-lg overflow-hidden border transition ${isPreview ? 'ring-2 ring-primary' : ''}`}
                  >
                    <div
                      style={{ backgroundImage: `url(${asset.url})` }}
                      className="aspect-square bg-cover bg-center w-full h-full rounded-md"
                    />

                    <Button
                      onClick={() => handleRemoveAsset(asset.id)}
                      className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </Button>

                    {!isPreview ? (
                      <Button
                        onClick={() => setPreviewId(asset.id)}
                        className="absolute bottom-2 left-2 px-2 py-1 text-xs bg-black/60 text-white rounded-md opacity-0 group-hover:opacity-100 transition"
                      >
                        Set as Preview
                      </Button>
                    ) : (
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-primary/90 text-white px-2 py-1 rounded-md text-xs font-medium">
                        <Star className="w-3 h-3 fill-white" />
                        Preview
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleUpload} disabled={loading || selectedAssetsRecord.length === 0}>
            {loading ? 'Uploading...' : 'Upload Post'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
