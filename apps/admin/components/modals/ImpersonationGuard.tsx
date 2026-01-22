'use client';

import { useAdmin } from '@/hooks/context/AdminContextWrapper';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { configService } from '@/util/config';
import { Button } from '@workspace/ui/components/button';
import { adminCookieKey, impersonatedCreatorId } from '@workspace/ui/lib/constants';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { Modal } from '@workspace/ui/modals/Modal';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const ImpersonationReturnGuard = () => {
  const router = useRouter();
  const { admin } = useAdmin();
  const { setSwitchContext } = useUtilsStore();

  const handleReturnToAdmin = () => {
    const adminToken = getCookie(adminCookieKey);

    if (adminToken) {
      setCookie(adminCookieKey, adminToken);
    }

    deleteCookie(adminCookieKey);
    deleteCookie(impersonatedCreatorId);

    setSwitchContext(admin.user);
    router.refresh();
  };

  const handleGoToCreator = () => {
    router.replace(buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL }));
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleGoToCreator}
      title="Impersonation active"
      description="You are currently impersonating a creator. Admin actions are disabled while impersonating"
    >
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleGoToCreator}>
          Go to Creator App
        </Button>
        <Button onClick={handleReturnToAdmin}>Return to Admin</Button>
      </div>
    </Modal>
  );
};
