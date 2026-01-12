'use client';

import { authCookieKey } from '@workspace/ui/lib';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@workspace/ui/lib';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Modal } from '@workspace/ui/modals/Modal';
import { useCreator } from '@/hooks/useCreator';
import { useUtilsStore } from '@/zustand/utils.store';
import { CreatorProfilesEntity } from '@workspace/gql/generated/graphql';

export const LogoutModal = () => {
  const { openLogoutModal, setOpenLogoutModal } = useUtilsStore();
  const router = useRouter();
  const { setCreator } = useCreator();

  const handleLogout = () => {
    deleteCookie(authCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_APP_URL }));
    setCreator({} as CreatorProfilesEntity);
  };

  const handleClose = () => {
    setOpenLogoutModal(false);
  };

  return (
    <Modal
      isOpen={openLogoutModal}
      onClose={() => setOpenLogoutModal(false)}
      title="Sign out"
      description="Looks like we are going to miss you sometime!"
    >
      <div className="flex flex-row justify-between">
        <Button variant={'outline'} size={'sm'} onClick={handleClose}>
          STAY LOGGED IN
        </Button>
        <Button variant={'destructive'} size={'sm'} onClick={handleLogout}>
          LOGOUT
        </Button>
      </div>
    </Modal>
  );
};
