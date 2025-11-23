'use client';

import { AuthAwareButton } from '@/components/AuthAwareButton';
import { UserContext } from '@/hooks/context/UserContextWrapper';
import { useAPI } from '@/hooks/useAPI';
import { useMutation } from '@apollo/client/react';
import { UPDATE_FAN_PROFILE_MUTATION } from '@workspace/gql/api/userAPI';
import { AssetType, FanProfilesEntity } from '@workspace/gql/generated/graphql';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { MediaType } from '@workspace/ui/lib';
import { Camera } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UpdateProfileInput {
  avatarUrl: string;
  bannerUrl: string;
  username: string;
}

export const Account = () => {
  const { upload } = useAPI();
  const [fan, setFan] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const [updateFanProfile] = useMutation(UPDATE_FAN_PROFILE_MUTATION);
  const [input, setInput] = useState<UpdateProfileInput>({
    avatarUrl: fan?.user.avatarUrl || '',
    bannerUrl: fan?.user.bannerUrl || '',
    username: fan?.user.username || ''
  });

  const [selectedFiles, setSelectedFiles] = useState<{
    avatarFile?: File;
    bannerFile?: File;
  }>({});

  useEffect(() => {
    const unchanged =
      fan?.user.avatarUrl === input.avatarUrl && fan?.user.bannerUrl === input.bannerUrl && fan?.user.username === input.username.trim();

    setIsDisabled(unchanged);
  }, [input, fan]);

  const handleSetInput = ({ key, value }: { key: keyof UpdateProfileInput; value: string }) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatarUrl' | 'bannerUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    handleSetInput({ key: type, value: previewUrl });

    setSelectedFiles((prev) => ({
      ...prev,
      [type === 'avatarUrl' ? 'avatarFile' : 'bannerFile']: file
    }));

    e.target.value = '';
  };

  // TODO: IMPLEMENT PROFILE PICTURE FOR FANS AFTER BACKEND ENDPOINT IS CREATED
  const handleUpload = async () => {
    if (selectedFiles.avatarFile) {
      const formData = new FormData();
      formData.append('file', selectedFiles.avatarFile);
      const { rawUrl } = await upload({ mediaType: MediaType.PROFILE_MEDIA, assetType: AssetType.Private, formdata: formData });
      input.avatarUrl = rawUrl;
    }

    if (selectedFiles.bannerFile) {
      const formData = new FormData();
      formData.append('file', selectedFiles.bannerFile);
      const { rawUrl } = await upload({ mediaType: MediaType.PROFILE_MEDIA, assetType: AssetType.Private, formdata: formData });
      input.bannerUrl = rawUrl;
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const finalInput: UpdateProfileInput = {
        avatarUrl: input.avatarUrl,
        bannerUrl: input.bannerUrl,
        username: input.username.trim().replace(/\s+/g, '')
      };

      const { data } = await updateFanProfile({ variables: { input: finalInput } });
      const updatedUser = data?.updateFanProfile as FanProfilesEntity;
      setFan(updatedUser);

      setSelectedFiles({});
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Failed to update profile', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInput({
      avatarUrl: fan?.user.avatarUrl || '',
      bannerUrl: fan?.user.bannerUrl || '',
      username: fan?.user.username || ''
    });

    if (avatarInputRef.current) avatarInputRef.current.value = '';
    if (bannerInputRef.current) bannerInputRef.current.value = '';
    setSelectedFiles({});

    toast.info('Changes discarded');
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Account</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="flex w-full flex-row flex-wrap items-center justify-between gap-4 md:col-span-2 md:justify-start md:gap-8">
          <div className="flex-1 space-y-2">
            <Label>Username</Label>
            <Input
              placeholder="Your username"
              className="max-w-xl min-w-[160px]"
              value={input.username}
              onChange={(e) => handleSetInput({ key: 'username', value: e.target.value })}
            />
          </div>

          <div className="relative cursor-pointer">
            <SAvatar url={input.avatarUrl || '/meowfans_banner.png'} className="w-20 h-20 shrink-0" />

            <Camera
              className="absolute bottom-2 right-2 text-white cursor-pointer hover:scale-110 transition-transform hidden"
              onClick={() => avatarInputRef.current?.click()}
            />

            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, 'avatarUrl')}
            />
          </div>

          <div className="relative cursor-pointer">
            <SAvatar url={input.bannerUrl || '/meowfans_banner.png'} className="w-20 h-20 shrink-0 rounded-md" />

            <Camera
              className="absolute bottom-2 right-2 text-white cursor-pointer hover:scale-110 transition-transform hidden"
              onClick={() => bannerInputRef.current?.click()}
            />

            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, 'bannerUrl')}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center flex-wrap justify-end gap-3">
        <AuthAwareButton variant="ghost" onClick={handleClose} disabled={isDisabled}>
          Discard
        </AuthAwareButton>
        <AuthAwareButton variant="default" title="Save Changes" onClick={handleUpdate} disabled={isDisabled}>
          Save Changes
        </AuthAwareButton>
      </CardFooter>
    </Card>
  );
};
