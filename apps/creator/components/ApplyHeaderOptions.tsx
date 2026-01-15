'use client';

import { AssetOptionsMenu } from '@/app/assets/components/AssetOptionsMenu';
import { useCreator } from '@/hooks/context/useCreator';
import { useAssetsStore } from '@/hooks/store/assets.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { normalizePath } from '@workspace/ui/lib/helpers';
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
  Lasso,
  LassoSelect,
  MailPlus,
  Search,
  Settings,
  Trash,
  Upload,
  UploadCloud,
  Users,
  UserX,
  X
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const ApplyHeaderOptions = () => {
  const { creator } = useCreator();
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
    rangeSelection
  } = useAssetsStore();
  const { setOpenPostCreateModal } = usePostsStore();

  const canCancel = canSelect || rangeSelection;

  if (pathname.startsWith('/posts')) {
    return (
      <div className="flex flex-row items-center space-x-2">
        <ApplyButtonTooltip tootTipTitle="Post studio" buttonProps={{ icon: BarChart3 }} onClick={() => router.push('/post')} />
        <ApplyButtonTooltip tootTipTitle="Create post" buttonProps={{ icon: Upload }} onClick={() => router.push('/assets')} />
        <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
      </div>
    );
  }

  if (pathname.startsWith('/post')) {
    return (
      <div className="flex flex-row items-center space-x-2">
        <ApplyButtonTooltip tootTipTitle="View posts" buttonProps={{ icon: FileDown }} onClick={() => router.push('/posts')} />
        <ApplyButtonTooltip tootTipTitle="Create post" buttonProps={{ icon: UploadCloud }} onClick={() => router.push('/assets')} />
        <ApplyButtonTooltip tootTipTitle="Insights" buttonProps={{ icon: BarChart3 }} onClick={() => router.push('/analytics')} />
      </div>
    );
  }

  switch (pathname) {
    case '/home':
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Search" buttonProps={{ icon: Search }} />
          <ApplyButtonTooltip tootTipTitle="Notifications" buttonProps={{ icon: Bell }} />
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
        </div>
      );

    case `/${creator.user.username}/edit`:
      return <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />;

    case `/${creator.user.username}`:
      return (
        <div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip
            tootTipTitle="Edit profile"
            buttonProps={{ icon: Edit }}
            onClick={() => router.push(normalizePath(creator.user.username, 'edit'))}
          />
          <ApplyButtonTooltip
            tootTipTitle="Followers"
            buttonProps={{ icon: Users }}
            onClick={() => router.push(normalizePath(creator.user.username, 'followers'))}
          />
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
                className={selectedAssets.length ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
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
          <ApplyButtonTooltip tootTipTitle="Payments" buttonProps={{ icon: CreditCard }} />
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
