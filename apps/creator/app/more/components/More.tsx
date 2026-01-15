import { DeleteAllAssetsModal } from '@/components/modals/DeleteAllAssetsModal';
import { LogoutModal } from '@/components/modals/LogoutModal';
import { TerminateAccountModal } from '@/components/modals/TerminateAccountModal';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { Account } from './Account';
import { Display } from './Display';
import { Header } from './Header';
import TerminateAccount from './TerminateAccount';

export const More = () => {
  const { setOpenLogoutModal } = useUtilsStore();
  const [deleteAllAssetsModal, setDeleteAllAssetsModal] = useState<boolean>(false);
  const [terminateAccountModal, setTerminateAccountModal] = useState<boolean>(false);

  return (
    <PageManager>
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 p-4 sm:p-6 md:p-10 lg:p-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <Header />

          <div className="space-y-6">
            <Account />
            <Display />
          </div>

          <div className="space-y-6">
            <TerminateAccount setTerminateAccountModal={setTerminateAccountModal} />
          </div>

          <TriggerModal
            onChangeModalState={() => setOpenLogoutModal(true)}
            modalIcon={{ icon: LogOut, size: 'default' }}
            modalText="Sign Out"
            className="min-w-50 shadow-sm"
          />
        </div>
      </div>
      <LogoutModal />
      <DeleteAllAssetsModal isOpen={deleteAllAssetsModal} setOpen={setDeleteAllAssetsModal} />
      <TerminateAccountModal setOpen={setTerminateAccountModal} isOpen={terminateAccountModal} />
    </PageManager>
  );
};
