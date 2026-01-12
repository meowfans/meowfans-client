'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { cn } from '@workspace/ui/lib/utils';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { motion } from 'framer-motion';
import { AlertTriangle, Trash2, XCircle } from 'lucide-react';

interface Props {
  setTerminateAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TerminateAccount: React.FC<Props> = ({ setTerminateAccountModal }) => {
  return (
    <GenericCard
      title="Danger Zone"
      description="Permanently delete your account and all associated data"
      icon={XCircle}
      variant="danger"
      animationDelay={0.3}
      iconClassName="bg-linear-to-br from-red-500/10 to-red-600/10 text-red-600 dark:text-red-400"
    >
      <div className="flex items-start gap-3 p-4 rounded-lg border border-red-200 dark:border-red-900/30 bg-red-100/50 dark:bg-red-950/20">
        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-red-900 dark:text-red-300">This action cannot be undone</p>
          <p className="text-xs text-red-700 dark:text-red-400">
            This will permanently delete your account, all your content, subscriptions, and associated data. Your username will become
            available for others to use.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-foreground">Delete Account</h4>
          <p className="text-xs text-muted-foreground">Once deleted, there is no going back. Please be certain.</p>
        </div>
        <TriggerModal
          onChangeModalState={() => setTerminateAccountModal(true)}
          className={cn(
            'bg-linear-to-r from-red-600 to-red-700',
            'hover:from-red-700 hover:to-red-800',
            'shadow-lg shadow-red-600/20',
            'transition-all duration-200'
          )}
          modalIcon={{ icon: Trash2, size: 'default' }}
          modalText="Delete Account"
        />
      </div>
    </GenericCard>
  );
};

export default TerminateAccount;
