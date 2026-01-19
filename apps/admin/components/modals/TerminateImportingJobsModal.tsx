'use client';

import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_CREATOR_PROFILE_QUERY } from '@workspace/gql/api/creatorAPI';
import { TERMINATE_ALL_JOBS_MUTATION } from '@workspace/gql/api/vaultsAPI';
import { UserRoles } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { Modal } from '@workspace/ui/modals/Modal';
import { BotOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const TerminateImportingJobsModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { terminatingImportsModal, setTerminatingImportsModal } = useVaultsStore();

  const [terminateAllJobs] = useMutation(TERMINATE_ALL_JOBS_MUTATION);
  const { data: creator } = useQuery(GET_CREATOR_PROFILE_QUERY);

  const handleTerminate = async () => {
    setLoading(true);
    try {
      if (!creator?.getCreatorProfile.user.roles.includes(UserRoles.Admin)) return;
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
