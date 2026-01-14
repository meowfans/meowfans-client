import { UpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';
import { Separator } from '@workspace/ui/components/separator';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { Toggle } from '@workspace/ui/globals/Toggle';

interface EditPrivacyAndVisibilityProps {
  onChangeInput: ({ key, value }: { key: keyof UpdateCreatorProfileInput; value: boolean }) => unknown;
  input: UpdateCreatorProfileInput;
}

export const EditPrivacyAndVisibility = ({ input, onChangeInput }: EditPrivacyAndVisibilityProps) => {
  return (
    <GenericCard title="Privacy & visibility">
      <div className="space-y-4">
        <Toggle
          label="Allow messaging"
          checked={input.allowsMessaging ?? false}
          onChange={(change) => onChangeInput({ key: 'allowsMessaging', value: change })}
        />
        <Toggle
          label="Allow comments"
          checked={input.allowsComment ?? false}
          onChange={(change) => onChangeInput({ key: 'allowsComment', value: change })}
        />
        <Separator />
        <Toggle
          label="Display online status"
          checked={input.displayOnlineStatus ?? false}
          onChange={(change) => onChangeInput({ key: 'displayOnlineStatus', value: change })}
        />
        <Toggle
          label="Display total posts"
          checked={input.displayTotalPost ?? false}
          onChange={(change) => onChangeInput({ key: 'displayTotalPost', value: change })}
        />
        <Toggle
          label="Display total subscribers"
          checked={input.displayTotalSubscriber ?? false}
          onChange={(change) => onChangeInput({ key: 'displayTotalSubscriber', value: change })}
        />
      </div>
    </GenericCard>
  );
};
