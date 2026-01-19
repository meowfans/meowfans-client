'use client';

import { ImportSingleCreatorSheet } from '@/app/vaults/[username]/ImportSingleCreatorSheet';
import { ImportCreatorsSheet } from '@/app/vaults/components/ImportCreatorsSheet';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import {
  Archive,
  BarChart3,
  Bell,
  CloudOff,
  CreditCard,
  DollarSign,
  Edit,
  FileDown,
  FilePlus2,
  Filter,
  Image as ImageIcon,
  Lock,
  MailPlus,
  PowerOff,
  Search,
  Settings,
  SunMoon,
  Trash,
  UserX
} from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

export const ApplyHeaderOptions = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { channelId, username } = useParams();

  const { setTerminatingImportsModal, setTerminateDownloadModal } = useVaultsStore();

  const handlePathName = () => {
    switch (pathname) {
      case `/channels/${channelId}`:
        return '/channels';
      case `/vaults/${username}`:
        return '/vaults';
      default:
        return pathname;
    }
  };

  switch (handlePathName()) {
    case '/home':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Search" buttonProps={{ icon: Search }} />
          <ApplyButtonTooltip tootTipTitle="Notifications" buttonProps={{ icon: Bell }} />
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
        </div>
      );

    case '/profiles':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Edit profile" buttonProps={{ icon: Edit }} />
          <ApplyButtonTooltip tootTipTitle="Images" buttonProps={{ icon: ImageIcon }} />
          <ApplyButtonTooltip tootTipTitle="Analytics" buttonProps={{ icon: BarChart3 }} />
          <Link href={'/more'}>
            <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} />
          </Link>
        </div>
      );

    case '/assets':
      return <div className="flex flex-row items-center space-x-2"></div>;

    case '/more':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} />
          <ApplyButtonTooltip tootTipTitle="Privacy & Security" buttonProps={{ icon: Lock }} />
          <ApplyButtonTooltip tootTipTitle="Payments" buttonProps={{ icon: CreditCard }} />
          <ApplyButtonTooltip tootTipTitle="Theme" buttonProps={{ icon: SunMoon }} />
        </div>
      );

    case '/channels':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="New message" buttonProps={{ icon: MailPlus }} />
          <ApplyButtonTooltip tootTipTitle="Search chats" buttonProps={{ icon: Search }} />
          <ApplyButtonTooltip tootTipTitle="Archive" buttonProps={{ icon: Archive }} />
          <ApplyButtonTooltip tootTipTitle="Blocked users" buttonProps={{ icon: UserX }} />
        </div>
      );

    case '/subscriptions':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="View plans" buttonProps={{ icon: FilePlus2 }} />
          <ApplyButtonTooltip tootTipTitle="Set pricing" buttonProps={{ icon: DollarSign }} />
          <ApplyButtonTooltip tootTipTitle="Add creator" buttonProps={{ icon: UserX }} />
        </div>
      );

    case '/cards':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Add card" buttonProps={{ icon: CreditCard }} />
          <ApplyButtonTooltip tootTipTitle="Remove card" buttonProps={{ icon: Trash }} />
          <ApplyButtonTooltip tootTipTitle="Card settings" buttonProps={{ icon: Settings }} />
        </div>
      );

    case '/analytics':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Filter" buttonProps={{ icon: Filter }} />
          <ApplyButtonTooltip tootTipTitle="Export" buttonProps={{ icon: FileDown }} />
          <ApplyButtonTooltip tootTipTitle="Search" buttonProps={{ icon: Search }} />
          <ApplyButtonTooltip tootTipTitle="Insights" buttonProps={{ icon: BarChart3 }} />
        </div>
      );

    case '/vaults':
      return (
        <div className="flex flex-row items-center space-x-2">
          {pathname === '/vaults' ? <ImportCreatorsSheet /> : <ImportSingleCreatorSheet />}
          <TriggerModal
            applyTooltip={{ title: 'Stop importing' }}
            modalIcon={{ icon: PowerOff }}
            onChangeModalState={() => setTerminatingImportsModal(true)}
          />
          <ApplyButtonTooltip
            tootTipTitle="Stop Downloading"
            buttonProps={{ icon: CloudOff }}
            onClick={() => setTerminateDownloadModal(true)}
          />
        </div>
      );

    default:
      return (
        <div className="flex items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
        </div>
      );
  }
};
