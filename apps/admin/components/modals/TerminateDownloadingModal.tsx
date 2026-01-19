'use client';

import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_CREATOR_PROFILE_QUERY } from '@workspace/gql/api/creatorAPI';
import { TERMINATE_ALL_DOWNLOADING_MUTATION } from '@workspace/gql/api/downloadAPI';
import { UserRoles } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { Modal } from '@workspace/ui/modals/Modal';
import { BotOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const TerminateDownloadingModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { terminateDownloadModal, setTerminateDownloadModal } = useVaultsStore();

  const [terminateAllJobs] = useMutation(TERMINATE_ALL_DOWNLOADING_MUTATION);
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
      setTerminateDownloadModal(false);
    }
  };

  return (
    <Modal
      isOpen={terminateDownloadModal}
      onClose={() => setTerminateDownloadModal(false)}
      description="Are you sure you want to stop downloading?"
      title="Force stop all downloading queue"
    >
      <div className="w-full flex flex-row justify-between">
        <Button variant={'secondary'} onClick={() => setTerminateDownloadModal(false)}>
          Cancel
        </Button>
        <LoadingButton Icon={BotOff} loading={loading} destructive title="Force stop" onClick={handleTerminate} />
      </div>
    </Modal>
  );
};
