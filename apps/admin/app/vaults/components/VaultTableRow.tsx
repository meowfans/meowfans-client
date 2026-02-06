import { DownloadStates, UsersEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { TableCell, TableRow } from '@workspace/ui/components/table';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { Copy, CopyCheck } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { toast } from 'sonner';
import { statusButtons } from './VaultsHeader';
import { VaultsTableRowOptions } from './VaultsTableRowOptions';

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
  const creatorProfile = user.creatorProfile;

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
        <VaultsTableRowOptions
          onJobAdded={onJobAdded}
          user={user}
          onCopy={handleCopy}
          onUpdateCreator={onUpdateCreator}
          userIdCopied={userIdCopied}
        />
      </TableCell>
    </TableRow>
  );
};
