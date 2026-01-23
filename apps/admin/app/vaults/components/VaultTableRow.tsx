import { ImpersonateCreatorTrigger } from '@/components/ImpersonateTrigger';
import { DownloadCreatorsAllVaultsModal } from '@/components/modals/DownloadCreatorsAllVaultsModal';
import { useMutation } from '@apollo/client/react';
import { CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION } from '@workspace/gql/api/vaultsAPI';
import { CleanUpVaultOutput, DownloadStates, UsersEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { TableCell, TableRow } from '@workspace/ui/components/table';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
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
  const isMobile = useIsMobile();
  const { errorHandler } = useErrorHandler();
  const [usernameCopied, setUsernameCopied] = useState<string | null>(null);
  const [userIdCopied, setUserIdCopied] = useState<string | null>(null);
  const [downloadAllCreatorVaultsModal, setDownloadAllCreatorVaultsModal] = useState<boolean>(false);
  const [cleanUpVaultObjects] = useMutation(CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION);
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

  const handleSliceUsername = (username: string) => {
    if (username.length > 10 && isMobile) return username.slice(0, 8).concat('...');
    return username;
  };

  return (
    <TableRow>
      <TableCell className="sticky left-0 z-10 bg-card md:max-w-sm max-w-36" id="name-cell">
        <div className="flex items-center md:space-x-2 space-x-0">
          <SAvatar url={user.avatarUrl} fallback="cr" />
          <div className="flex flex-col">
            <div className="flex flex-row content-center md:space-x-1 space-x-0">
              <ApplyButtonTooltip
                buttonProps={{ icon: usernameCopied ? CopyCheck : Copy, variant: 'ghost', size: 'sm' }}
                tootTipTitle="Copy username"
                onClick={() => handleCopy(user.username, 'username')}
              />
              <span className="md:font-bold font-normal truncate tracking-tight text-xs md:text-sm">
                {handleSliceUsername(user.username)}
              </span>
            </div>
            <span className="text-xs hidden md:flex text-muted-foreground">{user.id}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="w-12.5 table-cell">
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      </TableCell>
      {statusButtons.map((status) => (
        <TableCell key={status.label} className="text-center table-cell">
          <Badge className={status.className}>
            {status.status === DownloadStates.Fulfilled && creatorProfile.fulfilledObjectCount}
            {status.status === DownloadStates.Pending && creatorProfile.pendingObjectCount}
            {status.status === DownloadStates.Processing && creatorProfile.processingObjectCount}
            {status.status === DownloadStates.Rejected && creatorProfile.rejectedObjectCount}
          </Badge>
        </TableCell>
      ))}
      <TableCell className="whitespace-nowrap table-cell">
        <span className="text-xs">{moment(user.createdAt).format('LT L')}</span>
      </TableCell>
      <TableCell className="table-cell">
        <div className="flex items-center space-x-2">
          <ImpersonateCreatorTrigger creator={user} />

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

          <ApplyButtonTooltip
            buttonProps={{ icon: Download, variant: 'ghost', size: 'icon' }}
            tootTipTitle="Download all"
            disabled={canNotDownloadAllVaultObjects}
            onClick={() => setDownloadAllCreatorVaultsModal(true)}
          />
        </div>
      </TableCell>
      <DownloadCreatorsAllVaultsModal
        user={user}
        isOpen={downloadAllCreatorVaultsModal}
        setOpen={setDownloadAllCreatorVaultsModal}
        onJobAdded={onJobAdded}
        onCancel={() => setDownloadAllCreatorVaultsModal(false)}
      />
    </TableRow>
  );
};
