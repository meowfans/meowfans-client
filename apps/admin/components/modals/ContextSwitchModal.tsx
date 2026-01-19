'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { configService } from '@/util/config';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { adminCookieKey, authCookieKey, impersonatedCreatorId, MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { Modal } from '@workspace/ui/modals/Modal';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface ContextSwitchModalProps {
  creator?: UsersEntity;
}

export const ContextSwitchModal: React.FC<ContextSwitchModalProps> = ({ creator }) => {
  const { setSwitchContext,switchContext } = useUtilsStore();
  const router = useRouter();

  if (!creator) return null;

  const handleSwitchToCreator = () => {
    router.replace(buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL }));
  };

  const handleCancelImpersonation = () => {
    const adminToken = getCookie(adminCookieKey);

    if (adminToken) {
      setCookie(authCookieKey, adminToken);
    }

    deleteCookie(adminCookieKey);
    deleteCookie(impersonatedCreatorId);

    setSwitchContext(false);
    router.refresh();
  };

  return (
    <Modal
      isOpen={switchContext}
      onClose={handleCancelImpersonation}
      title="Impersonation Active"
      description="You are currently impersonating a creator"
    >
      <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
        <Avatar className="h-10 w-10">
          <AvatarImage src={creator.avatarUrl ?? MEOW_FANS_AVATAR} />
          <AvatarFallback>{creator.username?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="font-semibold truncate">{creator.username}</p>
          <p className="text-xs text-muted-foreground truncate">
            {creator.firstName} {creator.lastName}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-sm">
        <div>
          <span className="text-muted-foreground">User ID:</span> <span className="font-mono">{creator.id}</span>
        </div>

        <div>
          <span className="text-muted-foreground">Role:</span> <span className="font-medium">Creator</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-red-500">While impersonating, admin-only actions are disabled.</p>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={handleCancelImpersonation}>
          Stay in Admin
        </Button>

        <Button onClick={handleSwitchToCreator}>Switch to Creator App</Button>
      </div>
    </Modal>
  );
};
