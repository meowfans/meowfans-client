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
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { ArrowUpRight, Copy, CopyCheck, Download, Redo } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { statusButtons } from './VaultsHeader';

interface Props {
  idx: number;
  user: UsersEntity;
  onJobAdded: () => unknown;
  onUpdateCreator: (user: UsersEntity) => unknown;
  isSelected: boolean;
  onSelect: () => void;
}

export const VaultTableRow: React.FC<Props> = ({ idx, user, onJobAdded, onUpdateCreator, isSelected, onSelect }) => {
  const { errorHandler } = useErrorHandler();
  const [usernameCopied, setUsernameCopied] = useState<string | null>(null);
  const [userIdCopied, setUserIdCopied] = useState<string | null>(null);
  const [downloadAllCreatorVaultsModal, setDownloadAllCreatorVaultsModal] = useState<boolean>(false);
  const [cleanUpVaultObjects] = useMutation(CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION);

  const handleCleanUpVaultObjects = async (creatorId: string) => {
    try {
      const { data } = await cleanUpVaultObjects({ variables: { input: { creatorId } } });
      toast.success('Reverted objects to rejected state', {
        description: data?.cleanUpVaultObjectsOfACreator
      });
      onUpdateCreator({
        ...user,
        creatorProfile: {
          ...user.creatorProfile,
          rejectedObjectCount: user.creatorProfile.rejectedObjectCount + user.creatorProfile.processingObjectCount,
          processingObjectCount: 0
        }
      });
    } catch {
      toast.error('Something wrong happened!');
    }
  };

  const handleCopy = async (url: string, type: 'id' | 'username') => {
    try {
      await navigator.clipboard.writeText(url);
      if (type === 'username') setUsernameCopied(url);
      else setUserIdCopied(url);

      toast.success('Copied to clipboard', {
        description: url
      });

      setTimeout(() => {
        setUserIdCopied(null);
        setUsernameCopied(null);
      }, 2000);
    } catch (error) {
      errorHandler({ error });
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
            <SAvatar url={user.avatarUrl} fallback="cr" />
            <div className="flex flex-col">
              <div className="flex flex-row content-center space-x-1">
                <ApplyButtonTooltip
                  buttonProps={{ icon: usernameCopied ? CopyCheck : Copy, variant: 'ghost', size: 'sm' }}
                  tootTipTitle="Copy username"
                  onClick={() => handleCopy(user.username, 'username')}
                />
                <span className="font-bold text-sm">{user.username}</span>
              </div>
              <span className="text-xs text-muted-foreground">{user.id}</span>
            </div>
          </div>
        </TableCell>
        {statusButtons.map((status) => (
          <TableCell key={status.label} className="text-center">
            <Badge className={status.className}>
              {status.status === DownloadStates.Fulfilled && user.creatorProfile.fulfilledObjectCount}
              {status.status === DownloadStates.Pending && user.creatorProfile.pendingObjectCount}
              {status.status === DownloadStates.Processing && user.creatorProfile.processingObjectCount}
              {status.status === DownloadStates.Rejected && user.creatorProfile.rejectedObjectCount}
            </Badge>
          </TableCell>
        ))}
        <TableCell className="whitespace-nowrap hidden lg:table-cell">
          <span className="text-xs">{moment(user.createdAt).format('LT L')}</span>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <ApplyButtonTooltip
              buttonProps={{ icon: userIdCopied ? CopyCheck : Copy, variant: 'ghost', size: 'icon' }}
              tootTipTitle="Copy userId"
              onClick={() => handleCopy(user.id, 'id')}
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

            <Button
              variant="ghost"
              size="icon"
              disabled={!user.creatorProfile.pendingObjectCount}
              onClick={() => setDownloadAllCreatorVaultsModal(true)}
              title={`Download all(${user.creatorProfile.pendingObjectCount + user.creatorProfile.rejectedObjectCount})`}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <DownloadCreatorsAllVaultsModal
        user={user}
        isOpen={downloadAllCreatorVaultsModal}
        setOpen={setDownloadAllCreatorVaultsModal}
        onJobAdded={onJobAdded}
        onCancel={() => setDownloadAllCreatorVaultsModal(false)}
      />
    </>
  );
};
