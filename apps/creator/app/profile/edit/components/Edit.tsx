import { useCreator } from '@/hooks/context/useCreator';
import useAPI from '@/hooks/useAPI';
import { useCreatorMutation } from '@/hooks/useCreatorMutation';
import { UpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { Field } from '@workspace/ui/globals/Field';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EditPicture } from './EditPicture';
import { EditPrivacyAndVisibility } from './EditPrivacyAndVisibility';
import { MediaType } from '@workspace/ui/lib/enums';
import { resolveFileType } from '@workspace/ui/lib/helpers';

export const Edit = () => {
  const { upload } = useAPI();
  const { creator } = useCreator();
  const { loading, updateCreator } = useCreatorMutation();
  const [disabled, setIsDisabled] = useState<boolean>(false);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const original = {
    bio: creator.bio,
    allowsComment: creator.allowsComment,
    allowsMessaging: creator.allowsMessaging,
    displayTotalPost: creator.displayTotalPost,
    displayOnlineStatus: creator.displayOnlineStatus,
    displayTotalSubscriber: creator.displayTotalPost,
    avatarUrl: creator.user.avatarUrl,
    bannerUrl: creator.user.bannerUrl,
    username: creator.user.username
  };

  const [input, setInput] = useState<UpdateCreatorProfileInput>({ ...original });

  useEffect(() => {
    const noChange =
      creator.bio === input.bio?.trim() &&
      creator.user.username === input.username?.trim() &&
      creator.user.avatarUrl === input.avatarUrl &&
      creator.user.bannerUrl === input.bannerUrl &&
      creator.allowsMessaging === input.allowsMessaging &&
      creator.allowsComment === input.allowsComment &&
      creator.displayOnlineStatus === input.displayOnlineStatus &&
      creator.displayTotalPost === input.displayTotalPost &&
      creator.displayTotalSubscriber === input.displayTotalSubscriber &&
      !avatarFile &&
      !bannerFile;

    setIsDisabled(noChange);
  }, [input, creator, avatarFile, bannerFile]);

  const handleChangeInput = ({ key, value }: { key: keyof UpdateCreatorProfileInput; value: string | boolean }) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    setInput({
      ...creator,
      avatarUrl: creator.user.avatarUrl,
      bannerUrl: creator.user.bannerUrl,
      username: creator.user.username
    });

    setAvatarFile(null);
    setBannerFile(null);
  };

  const handleUpdateCreator = async () => {
    let avatarUrl = input.avatarUrl;
    let bannerUrl = input.bannerUrl;

    if (avatarFile) {
      const fd = new FormData();
      fd.append('file', avatarFile);
      const { rawUrl } = await upload({
        mediaType: MediaType.PROFILE_MEDIA,
        formData: fd,
        fileType: resolveFileType(avatarFile.name)
      });
      avatarUrl = rawUrl;
    }

    if (bannerFile) {
      const fd = new FormData();
      fd.append('file', bannerFile);
      const { rawUrl } = await upload({
        mediaType: MediaType.PROFILE_MEDIA,
        formData: fd,
        fileType: resolveFileType(bannerFile.name)
      });

      console.log({ rawUrl });
      bannerUrl = rawUrl;
    }

    await updateCreator({
      ...input,
      avatarUrl,
      bannerUrl
    });
    handleCancel();
  };

  useEffect(() => {
    setInput({ ...original });
  }, [creator]);

  return (
    <PageManager className="mx-auto max-w-3xl px-4 py-6 space-y-6">
      <EditPicture input={input} setAvatarFile={setAvatarFile} setBannerFile={setBannerFile} />
      <GenericCard title="Identity">
        <div className="space-y-4">
          <Field label="Username">
            <Input
              placeholder="username"
              value={input.username ?? ''}
              type="username"
              onChange={(e) => handleChangeInput({ key: 'username', value: e.target.value })}
            />
          </Field>
        </div>
      </GenericCard>

      <GenericCard title="Bio">
        <Textarea
          rows={4}
          placeholder="Tell people about yourself"
          value={input.bio ?? ''}
          onChange={(e) => handleChangeInput({ key: 'bio', value: e.target.value })}
        />
      </GenericCard>

      <EditPrivacyAndVisibility input={input} onChangeInput={({ key, value }) => handleChangeInput({ key, value })} />

      <div className="flex justify-end gap-3 sticky bottom-0 bg-background pt-4">
        <Button variant="outline" onClick={handleCancel} disabled={disabled}>
          Cancel
        </Button>
        <LoadingButton
          size="default"
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
