'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { Camera } from 'lucide-react';
import React, { useRef } from 'react';

interface EditProfilePictureProps {
  avatar: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAvatarEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditProfilePicture = ({ avatar, setAvatar, setIsAvatarEditing }: EditProfilePictureProps) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
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

  return (
    <div className="flex flex-col items-center gap-4">
      <Label className="text-sm">Profile picture</Label>

      <div className="relative group">
        <SAvatar url={avatar} className="w-40 h-40 rounded-full ring-4 ring-background" />

        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" variant="secondary" className="gap-2" onClick={() => avatarInputRef.current?.click()}>
            <Camera size={16} />
            Change
          </Button>
        </div>

        <Input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleChange(e)} />
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-xs">Recommended: square image, at least 400×400px</p>
    </div>
  );
};
