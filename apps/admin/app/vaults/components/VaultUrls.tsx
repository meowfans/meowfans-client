import { DownloadCreatorsAllVaultsModal } from '@/components/modals/DownloadCreatorsAllVaultsModal';
import { useMutation } from '@apollo/client/react';
import { CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION } from '@workspace/gql/api/vaultsAPI';
import { DownloadStates, UsersEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { ArrowUpRight, Download, Redo } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  idx: number;
  creator: UsersEntity;
  onJobAdded: () => unknown;
  onUpdateCreator: (creator: UsersEntity) => unknown;
}

export const VaultUrls: React.FC<Props> = ({ idx, creator, onJobAdded, onUpdateCreator }) => {
  const [downloadAllCreatorVaultsModal, setDownloadAllCreatorVaultsModal] = useState<boolean>(false);
  const [cleanUpVaultObjects] = useMutation(CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION);
  const handleCleanUpVaultObjects = async (creatorId: string) => {
    try {
      const { data } = await cleanUpVaultObjects({ variables: { input: { creatorId } } });
      toast.success('Reverted objects to rejected state', {
        description: data?.cleanUpVaultObjectsOfACreator
      });
      onUpdateCreator({
        ...creator,
        creatorProfile: {
          ...creator.creatorProfile,
          rejectedObjectCount: creator.creatorProfile.rejectedObjectCount + creator.creatorProfile.processingObjectCount,
          processingObjectCount: 0
        }
      });
    } catch {
      toast.error('Something wrong happened!');
    }
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row space-x-1.5">
          <Badge variant="secondary">{idx + 1}</Badge>
          <SAvatar url={creator.avatarUrl} fallback="cr" />
          <ApplyButtonTooltip
            className="cursor-pointer h-7 w-7"
            buttonProps={{ icon: Redo, variant: 'outline', size: 'icon' }}
            tootTipTitle="Revert processing"
            onClick={() =>
              toast('Clean up processing objects', {
                description: 'Be aware of this as this is not reversible!',
                action: {
                  label: 'Yes',
                  onClick: () => handleCleanUpVaultObjects(creator.id)
                }
              })
            }
          />
        </div>
        <div className="flex flex-row gap-1">
          <Badge className="text-xs font-medium bg-red-600 text-white">{creator.creatorProfile.rejectedObjectCount}</Badge>
          <Badge className="text-xs font-medium bg-blue-500 text-white">{creator.creatorProfile.fulfilledObjectCount}</Badge>
          <Badge className="text-xs font-medium animate-pulse">{creator.creatorProfile.pendingObjectCount}</Badge>
          <Badge className="text-xs font-medium bg-orange-500 text-white dark:bg-emerald-400">
            {creator.creatorProfile.processingObjectCount}
          </Badge>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full content-center items-center">
        <div className="flex flex-row">
          <Badge className="text-xs font-medium">{creator.username}</Badge>
        </div>
        <div className="flex flex-row space-x-1.5">
          <Link href={`/vaults/${creator.username}?status=${DownloadStates.Pending}`}>
            <ApplyButtonTooltip buttonProps={{ icon: ArrowUpRight, variant: 'outline' }} tootTipTitle="Visit" />
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full content-center items-center">
        <div className="flex flex-row space-x-1.5">
          <LoadingButton
            Icon={Download}
            title={`Download all(${creator.creatorProfile.pendingObjectCount})`}
            variant={'outline'}
            disabled={!creator.creatorProfile.pendingObjectCount}
            onClick={() => setDownloadAllCreatorVaultsModal(true)}
          />
        </div>
        <div className="flex flex-row">
          <p className="text-xs">{moment(creator.createdAt).format('LT L')}</p>
        </div>
      </div>

      <DownloadCreatorsAllVaultsModal
        creator={creator}
        onCancel={() => setDownloadAllCreatorVaultsModal(false)}
        isOpen={downloadAllCreatorVaultsModal}
        setOpen={setDownloadAllCreatorVaultsModal}
        onJobAdded={onJobAdded}
      />
    </div>
  );
};
