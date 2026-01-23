'use client';

import { AssetPickerModal } from '@/components/modals/AssetPickerModal';
import { CreatorAssetsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { SpanView } from '@workspace/ui/globals/SpanView';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { Camera, GalleryVerticalEnd } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface EditProfilePictureProps {
  avatar: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAvatarEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditProfilePicture = ({ avatar, setAvatar, setIsAvatarEditing }: EditProfilePictureProps) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [openAsstPickerModal, setOpenAsstPickerModal] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const avatarUrl = URL.createObjectURL(e.target.files[0]);
    setAvatar((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return avatarUrl;
    });
    setIsAvatarEditing(true);

    e.target.value = '';
  };

  const handleSelectFromAsset = async (creatorAsset: CreatorAssetsEntity) => {
    const proxiedUrl = `/server?url=${encodeURIComponent(creatorAsset.asset.rawUrl)}`;

    const res = await fetch(proxiedUrl);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);

    setAvatar(objectUrl);
    setOpenAsstPickerModal(false);
    setIsAvatarEditing(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Label className="text-sm">Profile picture</Label>

      <div className="relative group">
        <SAvatar url={avatar} className="w-40 h-40 rounded-full ring-4 ring-background" />

        <div className="absolute inset-0 space-x-1 md:bg-black/40 md:opacity-0 md:group-hover:opacity-100 sm:opacity-100 transition-opacity flex md:items-center items-end justify-end md:justify-center">
          <Button size="sm" variant="secondary" className="gap-2" onClick={() => avatarInputRef.current?.click()}>
            <Camera size={16} />
          </Button>
          <TriggerModal
            className="gap-2"
            onChangeModalState={setOpenAsstPickerModal}
            onClick={() => setOpenAsstPickerModal(true)}
            modalIcon={{ icon: GalleryVerticalEnd, size: 'sm', variant: 'secondary' }}
          />
        </div>

        <Input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleChange(e)} />
      </div>
      <SpanView
        label="Recommended"
        value={'square image, at least 400×400px'}
        className="text-xs text-muted-foreground text-center max-w-xs"
      />
      {openAsstPickerModal && (
        <AssetPickerModal
          open={openAsstPickerModal}
          onClose={() => setOpenAsstPickerModal(false)}
          onSelectUrl={(creatorAsset) => handleSelectFromAsset(creatorAsset)}
        />
      )}
    </div>
  );
};
