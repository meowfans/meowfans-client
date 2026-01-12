import { useCreator } from '@/hooks/context/useCreator';
import { useCreatorMutation } from '@/hooks/useCreatorMutation';
import { UpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Separator } from '@workspace/ui/components/separator';
import { Textarea } from '@workspace/ui/components/textarea';
import { Field } from '@workspace/ui/globals/Field';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { Toggle } from '@workspace/ui/globals/Toggle';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Edit = () => {
  const { creator } = useCreator();
  const { loading, updateCreator } = useCreatorMutation();
  const [disabled, setIsDisabled] = useState<boolean>(false);
  const [input, setInput] = useState<UpdateCreatorProfileInput>({
    bio: creator.bio,
    allowsComment: creator.allowsComment,
    allowsMessaging: creator.allowsMessaging,
    displayTotalPost: creator.displayTotalPost,
    displayOnlineStatus: creator.displayOnlineStatus,
    displayTotalSubscriber: creator.displayTotalPost,
    avatarUrl: creator.user.avatarUrl,
    bannerUrl: creator.user.bannerUrl,
    username: creator.user.username
  });

  useEffect(() => {
    const noChange =
      creator.bio === input.bio &&
      creator.user.username === input.username &&
      creator.user.avatarUrl === input.avatarUrl &&
      creator.user.bannerUrl === input.bannerUrl &&
      creator.allowsMessaging === input.allowsMessaging &&
      creator.allowsComment === input.allowsComment &&
      creator.displayOnlineStatus === input.displayOnlineStatus &&
      creator.displayTotalPost === input.displayTotalPost &&
      creator.displayTotalSubscriber === input.displayTotalSubscriber;

    setIsDisabled(noChange);
  }, [input, creator]);

  const handleChangeInput = ({ key, value }: { key: keyof UpdateCreatorProfileInput; value: string | boolean }) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    setInput({ ...creator, avatarUrl: creator.user.avatarUrl, bannerUrl: creator.user.bannerUrl, username: creator.user.username });
  };

  const handleUpdateCreator = async () => {
    await updateCreator(input);
  };

  return (
    <PageManager>
      <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Edit profile information</h1>
          <p className="text-sm text-muted-foreground">Update how your profile appears to others.</p>
        </div>
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

        <GenericCard title="Privacy & visibility">
          <div className="space-y-4">
            <Toggle
              label="Allow messaging"
              checked={input.allowsMessaging ?? false}
              onChange={(change) => handleChangeInput({ key: 'allowsMessaging', value: change })}
            />
            <Toggle
              label="Allow comments"
              checked={input.allowsComment ?? false}
              onChange={(change) => handleChangeInput({ key: 'allowsComment', value: change })}
            />
            <Separator />
            <Toggle
              label="Display online status"
              checked={input.displayOnlineStatus ?? false}
              onChange={(change) => handleChangeInput({ key: 'displayOnlineStatus', value: change })}
            />
            <Toggle
              label="Display total posts"
              checked={input.displayTotalPost ?? false}
              onChange={(change) => handleChangeInput({ key: 'displayTotalPost', value: change })}
            />
            <Toggle
              label="Display total subscribers"
              checked={input.displayTotalSubscriber ?? false}
              onChange={(change) => handleChangeInput({ key: 'displayTotalSubscriber', value: change })}
            />
          </div>
        </GenericCard>

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
      </div>
    </PageManager>
  );
};
