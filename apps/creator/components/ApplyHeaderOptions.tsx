'use client';

import { AssetOptionsMenu } from '@/app/assets/components/AssetOptionsMenu';
import { useAssetsStore } from '@/hooks/store/assets.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import {
  Archive,
  BarChart3,
  Bell,
  CreditCard,
  DollarSign,
  Edit,
  FileDown,
  FilePlus2,
  Filter,
  Image as ImageIcon,
  Lasso,
  LassoSelect,
  Lock,
  MailPlus,
  Search,
  Settings,
  SunMoon,
  Trash,
  Upload,
  UploadCloud,
  UserX,
  X
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const ApplyHeaderOptions = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const {
    setOpenUploadModal,
    setCanSelect,
    canSelect,
    setDeleteModal,
    selectedAssets,
    setSelectedAssets,
    setRangeSelection,
    rangeSelection,
    setOption
  } = useAssetsStore();
  const { openPostCreateModal, setOpenPostCreateModal } = usePostsStore();

  const canCancel = canSelect || rangeSelection;

  switch (pathname) {
    case '/home':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Search" buttonProps={{ icon: Search }} />
          <ApplyButtonTooltip tootTipTitle="Notifications" buttonProps={{ icon: Bell }} />
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
        </div>
      );

    case '/profile':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Edit profile" buttonProps={{ icon: Edit }} />
          <ApplyButtonTooltip tootTipTitle="Images" buttonProps={{ icon: ImageIcon }} />
          <ApplyButtonTooltip tootTipTitle="Analytics" buttonProps={{ icon: BarChart3 }} />
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
        </div>
      );

    case '/assets':
      return (
        <div className="flex flex-row items-center space-x-2">
          {canCancel && (
            <ApplyButtonTooltip
              tootTipTitle="Cancel"
              buttonProps={{ icon: X, size: 'icon' }}
              onClick={() => {
                setSelectedAssets([]);
                setCanSelect(false);
                setRangeSelection(false);
              }}
            />
          )}
          {!isMobile && (
            <>
              <TriggerModal
                applyTooltip={{ title: 'Delete assets' }}
                onChangeModalState={() => setDeleteModal(true)}
                modalIcon={{ icon: Trash, size: 'icon' }}
                className={selectedAssets.length ? 'bg-red-600' : ''}
                disabled={!selectedAssets.length}
              />
              <ApplyButtonTooltip
                tootTipTitle="Select"
                className={canSelect ? 'animate-pulse' : ''}
                buttonProps={{ icon: LassoSelect, variant: canSelect ? 'destructive' : 'default', size: 'icon' }}
                onClick={() => {
                  setSelectedAssets([]);
                  setCanSelect(!canSelect);
                  setRangeSelection(false);
                }}
              />
              <ApplyButtonTooltip
                tootTipTitle="Range selection"
                className={rangeSelection ? 'animate-pulse' : ''}
                buttonProps={{ icon: Lasso, variant: rangeSelection ? 'destructive' : 'default', size: 'icon' }}
                onClick={() => {
                  setSelectedAssets([]);
                  setCanSelect(true);
                  setRangeSelection(!rangeSelection);
                }}
              />
            </>
          )}
          <TriggerModal
            onChangeModalState={() => setOpenUploadModal(true)}
            modalIcon={{ icon: UploadCloud, size: 'icon' }}
            applyTooltip={{ title: 'Upload assets' }}
          />
          <TriggerModal
            onChangeModalState={() => setOpenPostCreateModal(true)}
            modalIcon={{ icon: Upload, size: 'icon' }}
            applyTooltip={{ title: 'Create post' }}
            disabled={!selectedAssets.length}
          />
          <AssetOptionsMenu />
        </div>
      );

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

    default:
      return (
        <div className="flex items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
        </div>
      );
  }
};
