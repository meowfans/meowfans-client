'use client';

import { UpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';
import { PreviewEditor } from '@workspace/ui/globals/PreviewEditor';
import { useState } from 'react';
import { EditBannerPicture } from './EditBannerPicture';
import { EditProfilePicture } from './EditProfilePicture';

interface EditHeaderProps {
  input: UpdateCreatorProfileInput;
  setBannerFile: React.Dispatch<React.SetStateAction<File | null>>;
  setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const EditPicture = ({ input, setAvatarFile, setBannerFile }: EditHeaderProps) => {
  const [isBannerEditing, setIsBannerEditing] = useState<boolean>(false);
  const [isAvatarEditing, setIsAvatarEditing] = useState<boolean>(false);
  const [banner, setBanner] = useState<string | null>(input.bannerUrl as string);
  const [avatar, setAvatar] = useState<string | null>(input.avatarUrl as string);

  const handleSaveBanner = (file: File, preview: string) => {
    setBanner(preview);
    setBannerFile(file);
  };

  const handleSaveAvatar = (file: File, preview: string) => {
    setAvatar(preview);
    setAvatarFile(file);
  };

  console.log({ isBannerEditing, banner, input });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Edit profile information</h1>
        <p className="text-sm text-muted-foreground">Update how your profile appears to others.</p>
      </div>

      <EditBannerPicture banner={banner} setBanner={setBanner} setIsBannerEditing={setIsBannerEditing} />
      {isBannerEditing && banner && (
        <PreviewEditor
          setImage={setBanner}
          image={banner}
          isEditing={isBannerEditing}
          setIsEditing={setIsBannerEditing}
          onSave={(file, preview) => handleSaveBanner(file, preview)}
        />
      )}

      <EditProfilePicture avatar={avatar} setAvatar={setAvatar} setIsAvatarEditing={setIsAvatarEditing} />
      {isAvatarEditing && avatar && (
        <PreviewEditor
          setImage={setAvatar}
          image={avatar}
          isEditing={isAvatarEditing}
          setIsEditing={setIsAvatarEditing}
          onSave={(file, preview) => handleSaveAvatar(file, preview)}
        />
      )}
    </div>
  );
};
