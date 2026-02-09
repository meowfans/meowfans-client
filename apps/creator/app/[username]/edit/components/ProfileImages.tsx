'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { PreviewEditor } from '@workspace/ui/globals/PreviewEditor';
import { Camera, Edit, Upload } from 'lucide-react';
import NextImage from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { AssetSelectorModal } from './AssetSelectorModal';

type ImageType = 'avatar' | 'banner';

export function ProfileImages() {
  const { creator } = useCreator();
  const { updateCreator, loading } = useCreatorMutations();
  const [modalOpen, setModalOpen] = useState(false);
  const [imageType, setImageType] = useState<ImageType>('avatar');
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  if (!creator) return null;

  const user = creator?.user;
  const username = user?.username || 'Creator';
  const avatarUrl = user?.avatarUrl;
  const bannerUrl = user?.bannerUrl;

  const handleOpenModal = (type: ImageType) => {
    setImageType(type);
    setModalOpen(true);
  };

  const handleSelectAsset = (assetUrl: string) => {
    if (imageType === 'avatar') {
      updateCreator({ avatarUrl: assetUrl });
    } else {
      updateCreator({ bannerUrl: assetUrl });
    }
  };

  const handleStartEdit = (type: ImageType) => {
    setImageType(type);
    setEditingImage(type === 'avatar' ? avatarUrl || null : bannerUrl || null);
    setIsEditing(true);
  };

  const handleSaveEdit = async (file: File, previewUrl: string) => {
    try {
      // For now, just show a toast - you'll need to implement upload functionality
      toast.info('Upload functionality coming soon', {
        description: 'The image editor is ready, but upload needs to be implemented'
      });

      // TODO: Upload the edited image and update profile
      // const uploadedUrl = await uploadImage(file);
      // if (imageType === 'avatar') {
      //   await updateCreator({ avatarUrl: uploadedUrl });
      // } else {
      //   await updateCreator({ bannerUrl: uploadedUrl });
      // }
    } catch (error) {
      console.error('Failed to save edited image:', error);
    } finally {
      setIsEditing(false);
      setEditingImage(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingImage(null);
  };

  // Show PreviewEditor if editing
  if (isEditing) {
    return (
      <div className="space-y-6">
        <PreviewEditor
          image={editingImage}
          isEditing={isEditing}
          setImage={setEditingImage}
          setIsEditing={setIsEditing}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          title={`Edit ${imageType === 'avatar' ? 'Profile Picture' : 'Cover Banner'}`}
          description={`Crop, rotate, and adjust your ${imageType === 'avatar' ? 'profile picture' : 'cover banner'}.`}
          defaultAspectRatio={imageType === 'avatar' ? 1 / 1 : 21 / 9}
          cropShape={imageType === 'avatar' ? 'round' : 'rect'}
          corsProxyUrl="/server"
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Avatar Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Your profile picture appears across the platform</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-border">
                <AvatarImage src={avatarUrl || undefined} alt={username} />
                <AvatarFallback className="text-3xl font-black">{username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleOpenModal('avatar')}
                disabled={loading}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center space-y-2 w-full">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => handleOpenModal('avatar')} disabled={loading}>
                  <Upload className="mr-2 h-4 w-4" />
                  {loading ? 'Updating...' : 'Select from Assets'}
                </Button>
                {avatarUrl && (
                  <Button variant="outline" size="icon" onClick={() => handleStartEdit('avatar')} disabled={loading} title="Edit image">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Select from your assets or edit existing</p>
            </div>
          </CardContent>
        </Card>

        {/* Banner Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Cover Banner</CardTitle>
            <CardDescription>Customize your profile with a banner image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-[21/9] rounded-lg overflow-hidden bg-secondary/20 border-2 border-dashed border-border group hover:border-primary transition-colors">
              {bannerUrl ? (
                <NextImage src={bannerUrl} alt="Banner" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No banner uploaded</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" onClick={() => handleOpenModal('banner')} disabled={loading}>
                  <Upload className="mr-2 h-4 w-4" />
                  {loading ? 'Updating...' : 'Select from Assets'}
                </Button>
                {bannerUrl && (
                  <Button variant="secondary" onClick={() => handleStartEdit('banner')} disabled={loading}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Recommended: 2100x900px. Select from your assets or edit existing</p>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Stats</CardTitle>
            <CardDescription>Your current profile metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-black">{creator.totalPost || 0}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Subscribers</p>
                <p className="text-2xl font-black">{creator.totalSubscriber || 0}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Public Posts</p>
                <p className="text-2xl font-black">{creator.totalPublicPost || 0}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Exclusive Posts</p>
                <p className="text-2xl font-black">{creator.totalExclusivePost || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Verification Status</p>
                <p className="text-xs text-muted-foreground">Your account verification level</p>
              </div>
              <Badge variant={creator.verified ? 'default' : 'secondary'} className="uppercase">
                {creator.verified ? 'Verified' : 'Unverified'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Selector Modal */}
      <AssetSelectorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectAsset}
        selectedUrl={imageType === 'avatar' ? avatarUrl || undefined : bannerUrl || undefined}
        title={imageType === 'avatar' ? 'Select Profile Picture' : 'Select Cover Banner'}
        aspectRatio={imageType === 'avatar' ? 'square' : 'banner'}
      />
    </>
  );
}
