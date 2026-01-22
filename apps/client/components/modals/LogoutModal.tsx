'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { configService } from '@/util/config';
import { Button } from '@workspace/ui/components/button';
import { authCookieKey, authRefreshCookieKey, buildSafeUrl, fanCookieKey, fanRefreshCookieKey } from '@workspace/ui/lib';
import { Modal } from '@workspace/ui/modals/Modal';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const LogoutModal = () => {
  const { openLogoutModal, setOpenLogoutModal } = useUtilsStore();
  const router = useRouter();
  const { setFan } = useFan();

  const handleLogout = () => {
    deleteCookie(fanCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    deleteCookie(fanRefreshCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });

    deleteCookie(authCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    deleteCookie(authRefreshCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_APP_URL }));
    setFan(null);
  };

  const handleClose = () => {
    setOpenLogoutModal(false);
  };

  return (
    <Modal
      isOpen={openLogoutModal}
      onClose={() => setOpenLogoutModal(false)}
      title="Logout"
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
