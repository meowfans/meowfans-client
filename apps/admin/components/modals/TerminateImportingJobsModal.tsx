'use client';

import { useAdmin } from '@/hooks/context/AdminContextWrapper';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useMutation } from '@apollo/client/react';
import { TERMINATE_ALL_JOBS_MUTATION } from '@workspace/gql/api/vaultsAPI';
import { UserRoles } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { Modal } from '@workspace/ui/modals/Modal';
import { BotOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const TerminateImportingJobsModal = () => {
  const { admin } = useAdmin();
  const [loading, setLoading] = useState<boolean>(false);
  const [terminateAllJobs] = useMutation(TERMINATE_ALL_JOBS_MUTATION);
  const { terminatingImportsModal, setTerminatingImportsModal } = useVaultsStore();

  const handleTerminate = async () => {
    setLoading(true);
    try {
      if (!admin.user.roles.includes(UserRoles.Admin)) return;
      await terminateAllJobs();
      toast.success('All jobs terminated!');
    } catch {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
      setTerminatingImportsModal(false);
    }
  };

  return (
    <Modal
      isOpen={terminatingImportsModal}
      onClose={() => setTerminatingImportsModal(false)}
      description="Are you sure you want to terminate all jobs?"
      title="Terminate all jobs"
    >
      <div className="w-full flex flex-row justify-between">
        <Button variant={'secondary'} onClick={() => setTerminatingImportsModal(false)}>
          Cancel
        </Button>
        <LoadingButton Icon={BotOff} loading={loading} destructive title="Terminate" onClick={handleTerminate} />
      </div>
    </Modal>
  );
};
