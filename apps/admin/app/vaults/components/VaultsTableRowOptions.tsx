import { ImpersonateCreatorTrigger } from '@/components/ImpersonateTrigger';
import { DownloadCreatorsAllVaultsModal } from '@/components/modals/DownloadCreatorsAllVaultsModal';
import { useMutation } from '@apollo/client/react';
import { CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION } from '@workspace/gql/api';
import { CleanUpVaultOutput, DownloadStates, UsersEntity } from '@workspace/gql/generated/graphql';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { ArrowUpRight, Copy, CopyCheck, Download, Link, Redo } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface VaultsTableRowOptionsProps {
  user: UsersEntity;
  onJobAdded: () => void;
  userIdCopied: string | null;
  onUpdateCreator: (creator: UsersEntity) => void;
  onCopy: (url: string, type: 'id' | 'username') => void;
}

export const VaultsTableRowOptions = ({ user, userIdCopied, onUpdateCreator, onCopy,onJobAdded }: VaultsTableRowOptionsProps) => {
  const [cleanUpVaultObjects] = useMutation(CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION);
  const [downloadAllCreatorVaultsModal, setDownloadAllCreatorVaultsModal] = useState<boolean>(false);
  const creatorProfile = user.creatorProfile;
  const canNotDownloadAllVaultObjects =
    !creatorProfile.pendingObjectCount && !creatorProfile.rejectedObjectCount && !creatorProfile.processingObjectCount;

  const handleCleanUpVaultObjects = async (creatorId: string) => {
    try {
      const { data } = await cleanUpVaultObjects({ variables: { input: { creatorId } } });
      const { affected, fulfilledObjectCount, pendingObjectCount, processingObjectCount, rejectedObjectCount } =
        data?.cleanUpVaultObjectsOfACreator as CleanUpVaultOutput;
      toast.success('Reverted objects to rejected state', {
        description: affected
      });
      onUpdateCreator({
        ...user,
        creatorProfile: {
          ...creatorProfile,
          rejectedObjectCount,
          processingObjectCount,
          pendingObjectCount,
          fulfilledObjectCount
        }
      });
    } catch {
      toast.error('Something wrong happened!');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <ImpersonateCreatorTrigger creator={user} />

      <ApplyButtonTooltip
        buttonProps={{ icon: userIdCopied ? CopyCheck : Copy, variant: 'ghost', size: 'icon' }}
        tootTipTitle="Copy userId"
        onClick={() => onCopy(user.id, 'id')}
      />

      <Link href={`/vaults/${user.username}?status=${DownloadStates.Pending}`}>
        <ApplyButtonTooltip buttonProps={{ icon: ArrowUpRight, variant: 'ghost', size: 'icon' }} tootTipTitle="Visit" />
      </Link>

      <ApplyButtonTooltip
        buttonProps={{ icon: Redo, variant: 'ghost', size: 'icon' }}
        tootTipTitle="Revert processing"
        onClick={() =>
          toast('Clean up processing objects', {
            description: 'Be aware of this as this is not reversible!',
            action: {
              label: 'Yes',
              onClick: () => handleCleanUpVaultObjects(user.id)
            }
          })
        }
      />

      <ApplyButtonTooltip
        buttonProps={{ icon: Download, variant: 'ghost', size: 'icon' }}
        tootTipTitle="Download all"
        disabled={canNotDownloadAllVaultObjects}
        onClick={() => setDownloadAllCreatorVaultsModal(true)}
      />

      <DownloadCreatorsAllVaultsModal
        user={user}
        isOpen={downloadAllCreatorVaultsModal}
        setOpen={setDownloadAllCreatorVaultsModal}
        onJobAdded={onJobAdded}
        onCancel={() => setDownloadAllCreatorVaultsModal(false)}
      />
    </div>
  );
};
