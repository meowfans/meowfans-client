import { DeleteAllAssetsModal } from '@/components/modals/DeleteAllAssetsModal';
import { TerminateAccountModal } from '@/components/modals/TerminateAccountModal';
import { Separator } from '@workspace/ui/components/separator';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { Bell, Settings, Star, Sun } from 'lucide-react';
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

const features: Feature[] = [
  { id: 'privacy', title: 'Privacy Hub', desc: 'Manage who sees your profile and assets.', featured: true, icon: <Settings size={18} /> },
  { id: 'theme', title: 'Appearance', desc: 'Light, dark or system theme controls.', featured: true, icon: <Sun size={18} /> },
  { id: 'notifications', title: 'Notifications', desc: 'Control push and email notifications.', icon: <Bell size={18} /> },
  { id: 'rewards', title: 'Rewards', desc: 'View badges, achievements and perks.', icon: <Star size={18} /> }
];

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
