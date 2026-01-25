'use client';

import { useCreator } from '@/hooks/context/useCreator';
import useAPI from '@/hooks/useAPI';
import { useCreatorMutation } from '@/hooks/useCreatorMutation';
import { AssetType, UpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { Field } from '@workspace/ui/globals/Field';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { MediaType } from '@workspace/ui/lib/enums';
import { resolveFileType } from '@workspace/ui/lib/helpers';
import { Loader } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EditPicture } from './EditPicture';
import { EditPrivacyAndVisibility } from './EditPrivacyAndVisibility';

const normalize = (v?: string | null) => v?.trim() ?? '';

export const Edit = () => {
  const { upload } = useAPI();
  const { creator } = useCreator();
  const { loading, updateCreator } = useCreatorMutation();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [disabled, setDisabled] = useState(true);

  const original = useMemo<UpdateCreatorProfileInput>(
    () => ({
      bio: creator.bio,
      allowsComment: creator.allowsComment,
      allowsMessaging: creator.allowsMessaging,
      displayTotalPost: creator.displayTotalPost,
      displayOnlineStatus: creator.displayOnlineStatus,
      displayTotalSubscriber: creator.displayTotalSubscriber,
      avatarUrl: creator.user.avatarUrl,
      bannerUrl: creator.user.bannerUrl,
      username: creator.user.username
    }),
    [creator]
  );

  const [input, setInput] = useState<UpdateCreatorProfileInput>(original);

  useEffect(() => {
    setInput(original);
    setAvatarFile(null);
    setBannerFile(null);
  }, [creator.creatorId]); // eslint-disable-line

  useEffect(() => {
    const noChange =
      normalize(original.bio) === normalize(input.bio) &&
      normalize(original.username) === normalize(input.username) &&
      original.avatarUrl === input.avatarUrl &&
      original.bannerUrl === input.bannerUrl &&
      original.allowsMessaging === input.allowsMessaging &&
      original.allowsComment === input.allowsComment &&
      original.displayOnlineStatus === input.displayOnlineStatus &&
      original.displayTotalPost === input.displayTotalPost &&
      original.displayTotalSubscriber === input.displayTotalSubscriber &&
      !avatarFile &&
      !bannerFile;

    setDisabled(noChange);
  }, [input, original, avatarFile, bannerFile]);

  const handleChangeInput = <K extends keyof UpdateCreatorProfileInput>(key: K, value: UpdateCreatorProfileInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    setInput(original);
    setAvatarFile(null);
    setBannerFile(null);
  };

  const uploadFile = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);

    const { rawUrl } = await upload({
      mediaType: MediaType.PROFILE_MEDIA,
      formData: fd,
      fileType: resolveFileType(file.name),
      assetType: AssetType.Private
    });

    return rawUrl;
  };

  const handleUpdateCreator = async () => {
    let avatarUrl = input.avatarUrl;
    let bannerUrl = input.bannerUrl;

    if (avatarFile) avatarUrl = await uploadFile(avatarFile);
    if (bannerFile) bannerUrl = await uploadFile(bannerFile);

    await updateCreator({
      ...input,
      avatarUrl,
      bannerUrl
    });

    handleCancel();
  };

  return (
    <PageManager className="mx-auto max-w-3xl px-4 py-6 space-y-6">
      <EditPicture input={input} setAvatarFile={setAvatarFile} setBannerFile={setBannerFile} />

      <GenericCard title="Identity">
        <Field label="Username">
          <Input placeholder="username" value={input.username ?? ''} onChange={(e) => handleChangeInput('username', e.target.value)} />
        </Field>
      </GenericCard>

      <GenericCard title="Bio">
        <Textarea
          rows={4}
          placeholder="Tell people about yourself"
          value={input.bio ?? ''}
          onChange={(e) => handleChangeInput('bio', e.target.value)}
        />
      </GenericCard>

      <EditPrivacyAndVisibility input={input} onChangeInput={({ key, value }) => handleChangeInput(key, value)} />

      <div className="sticky bottom-0 flex justify-end gap-3 bg-background pt-4">
        <Button variant="outline" onClick={handleCancel} disabled={disabled}>
          Cancel
        </Button>

        <LoadingButton
          title="Save changes"
          variant="secondary"
          loading={loading}
          Icon={Loader}
          disabled={disabled}
          onClick={handleUpdateCreator}
        />
      </div>
    </PageManager>
  );
};
