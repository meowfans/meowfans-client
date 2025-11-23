'use client';

import { configService } from '@/util/config';
import { useMutation } from '@apollo/client/react';
import { DELETE_USER_MUTATION } from '@workspace/gql/api/userAPI';
import { Button } from '@workspace/ui/components/button';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { buildSafeUrl } from '@workspace/ui/lib';
import { Modal } from '@workspace/ui/modals/Modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TerminateAccountModal: React.FC<Props> = ({ isOpen, setOpen }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const authUrl = buildSafeUrl({ host: configService.NEXT_PUBLIC_APP_URL });
  const handleClose = () => {
    setOpen(false);
  };

  const handleTerminate = async () => {
    setLoading(true);
    try {
      await deleteUser();
      toast.success('Deleted your account!');
      router.push(authUrl);
    } catch (error) {
      toast.error('Something error happened!');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      title="Terminate your account"
      description={'Are you sure you want to terminate your account?'}
    >
      <div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton onClick={handleTerminate} destructive size="lg" title="Terminate" loading={loading} />
      </div>
    </Modal>
  );
};
