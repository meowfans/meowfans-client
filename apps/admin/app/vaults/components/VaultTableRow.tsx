import { DownloadCreatorsAllVaultsModal } from '@/components/modals/DownloadCreatorsAllVaultsModal';
import { useMutation } from '@apollo/client/react';
import { CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION } from '@workspace/gql/api/vaultsAPI';
import { DownloadStates, UsersEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { TableCell, TableRow } from '@workspace/ui/components/table';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { ArrowUpRight, Download, Redo } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { statusButtons } from './VaultsHeader';

interface Props {
  idx: number;
  creator: UsersEntity;
  onJobAdded: () => unknown;
  onUpdateCreator: (creator: UsersEntity) => unknown;
  isSelected: boolean;
  onSelect: () => void;
}

export const VaultTableRow: React.FC<Props> = ({ idx, creator, onJobAdded, onUpdateCreator, isSelected, onSelect }) => {
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
    <>
      <TableRow>
        <TableCell className="w-12.5">
          <Checkbox checked={isSelected} onCheckedChange={onSelect} />
        </TableCell>
        <TableCell className="font-medium text-xs text-muted-foreground">{idx + 1}</TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <SAvatar url={creator.avatarUrl} fallback="cr" />
            <div className="flex flex-col">
              <span className="font-bold text-sm">{creator.username}</span>
              <span className="text-xs text-muted-foreground">{creator.id}</span>
            </div>
          </div>
        </TableCell>
        {statusButtons.map((status) => (
          <TableCell key={status.label} className="text-center">
            <Badge className={status.className}>
              {status.status === DownloadStates.Fulfilled && creator.creatorProfile.fulfilledObjectCount}
              {status.status === DownloadStates.Pending && creator.creatorProfile.pendingObjectCount}
              {status.status === DownloadStates.Processing && creator.creatorProfile.processingObjectCount}
              {status.status === DownloadStates.Rejected && creator.creatorProfile.rejectedObjectCount}
            </Badge>
          </TableCell>
        ))}
        <TableCell className="whitespace-nowrap hidden lg:table-cell">
          <span className="text-xs">{moment(creator.createdAt).format('LT L')}</span>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <Link href={`/vaults/${creator.username}?status=${DownloadStates.Pending}`}>
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
                    onClick: () => handleCleanUpVaultObjects(creator.id)
                  }
                })
              }
            />

            <Button
              variant="ghost"
              size="icon"
              disabled={!creator.creatorProfile.pendingObjectCount}
              onClick={() => setDownloadAllCreatorVaultsModal(true)}
              title={`Download all(${creator.creatorProfile.pendingObjectCount})`}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <DownloadCreatorsAllVaultsModal
        creator={creator}
        isOpen={downloadAllCreatorVaultsModal}
        setOpen={setDownloadAllCreatorVaultsModal}
        onJobAdded={onJobAdded}
        onCancel={() => setDownloadAllCreatorVaultsModal(false)}
      />
    </>
  );
};
