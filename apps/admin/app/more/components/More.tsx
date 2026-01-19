'use client';

import { DeleteAllAssetsModal } from '@/components/modals/DeleteAllAssetsModal';
import { TerminateAccountModal } from '@/components/modals/TerminateAccountModal';
import { Separator } from '@workspace/ui/components/separator';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useState } from 'react';
import { Display } from './Display';
import { Header } from './Header';
import Logout from './Logout';
import { QuickActions } from './QuickActions';
import TerminateAccount from './TerminateAccount';

export type Feature = {
  id: string;
  title: string;
  desc: string;
  featured?: boolean;
  icon?: React.ReactNode;
};

export const More = () => {
  const [terminateAccountModal, setTerminateAccountModal] = useState<boolean>(false);
  const [deleteAllAssetsModal, setDeleteAllAssetsModal] = useState<boolean>(false);

  return (
    <PageManager>
      <div className="min-h-screen bg-surface-50 p-6 md:p-10 lg:p-16">
        <div className="max-w-7xl mx-auto space-y-1">
          <Header />
          <Separator />
          <QuickActions setDeleteAllAssetsModal={setDeleteAllAssetsModal} />
          <Display />
          <TerminateAccount setTerminateAccountModal={setTerminateAccountModal} />
          <Logout />
        </div>
      </div>
      <DeleteAllAssetsModal isOpen={deleteAllAssetsModal} setOpen={setDeleteAllAssetsModal} />
      <TerminateAccountModal setOpen={setTerminateAccountModal} isOpen={terminateAccountModal} />
    </PageManager>
  );
};
