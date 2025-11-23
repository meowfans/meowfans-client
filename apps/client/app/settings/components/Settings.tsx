'use client';

import { LogoutModal } from '@/components/modals/LogoutModal';
import { TerminateAccountModal } from '@/components/modals/TerminateAccountModal';
import { UserContext } from '@/hooks/context/UserContextWrapper';
import { Separator } from '@workspace/ui/components/separator';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useContext, useState } from 'react';
import { Account } from './Account';
import { Display } from './Display';
import { Header } from './Header';
import Logout from './Logout';
import TerminateAccount from './TerminateAccount';
import { ZoneSubscription } from './ZoneSubscription';

export const Settings = () => {
  const [fan] = useContext(UserContext);
  const [terminateAccountModal, setTerminateAccountModal] = useState<boolean>(false);

  return (
    <PageManager className="mb-10">
      <div className="min-h-screen bg-surface-50 p-6 md:p-10 lg:p-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <Header />
          <Separator />

          {fan && (
            <div className="flex flex-col space-y-4">
              <Account />
              <ZoneSubscription />
              <TerminateAccount setTerminateAccountModal={setTerminateAccountModal} />
              <Logout />
            </div>
          )}

          <Display />
        </div>
      </div>

      <TerminateAccountModal setOpen={setTerminateAccountModal} isOpen={terminateAccountModal} />
      <LogoutModal />
    </PageManager>
  );
};
