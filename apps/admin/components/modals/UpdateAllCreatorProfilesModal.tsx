'use client';

import { CreatorContext } from '@/hooks/context/AdminContextWrapper';
import { useMutation } from '@apollo/client/react';
import { UPDATE_ALL_CREATOR_PROFILES_MUTATION } from '@workspace/gql/api/userAPI';
import { Button } from '@workspace/ui/components/button';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { Modal } from '@workspace/ui/modals/Modal';
import { useContext } from 'react';
import { toast } from 'sonner';

interface Props {
  isOpen: boolean;
  onClose: () => unknown;
}

export const UpdateAllCreatorProfilesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [updateAllCreatorProfiles, { loading }] = useMutation(UPDATE_ALL_CREATOR_PROFILES_MUTATION);
  const [admin] = useContext(CreatorContext);

  const handleClose = () => {
    onClose();
  };

  const handleUpdateAllCreatorProfiles = async () => {
    try {
      const { data } = await updateAllCreatorProfiles({ variables: { input: { adminId: admin.getCreatorProfile.creatorId } } });
      toast.success(data?.updateAllCreatorProfiles);
    } catch {
      toast.error('Something wrong happened!');
    } finally {
      handleClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} description="Be aware of this as this is irreversible!" title="Update all creator profiles">
      <div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton size="lg" title="Update" loading={loading} onClick={handleUpdateAllCreatorProfiles} />
      </div>
    </Modal>
  );
};
