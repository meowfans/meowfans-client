'use client';

import { useAssetsStore } from '@/hooks/store/assets.store';
import { useMutation } from '@apollo/client/react';
import { DELETE_CREATOR_ASSETS_MUTATION, GET_CREATOR_ASSETS_QUERY } from '@workspace/gql/api/assetsAPI';
import { Button } from '@workspace/ui/components/button';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { Modal } from '@workspace/ui/modals/Modal';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  onDelete: () => unknown;
}

export const DeleteAssetsModal: React.FC<Props> = ({ onDelete }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteCreatorAssets] = useMutation(DELETE_CREATOR_ASSETS_MUTATION, {
    refetchQueries() {
      return [{ query: GET_CREATOR_ASSETS_QUERY, variables: { input: { limit: 30 } } }];
    }
  });
  const { deleteModal, setDeleteModal, selectedAssets: assets, setSelectedAssets, setCanSelect } = useAssetsStore();

  const handleDeleteAssets = async () => {
    setLoading(true);
    try {
      await deleteCreatorAssets({
        variables: {
          input: { assetIds: assets }
        }
      });
      onDelete();
      toast.success('Deleted assets permanently');
    } catch {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setDeleteModal(false);
    setSelectedAssets([]);
    setCanSelect(false);
  };

  return (
    <Modal
      isOpen={deleteModal}
      onClose={handleClose}
      title="Delete Panel"
      description={`Are you sure you want to delete ${assets.length} asset${assets.length > 1 ? 's' : ''}?`}
    >
      <div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton destructive size="lg" title="Delete" loading={loading} onClick={handleDeleteAssets} />
      </div>
    </Modal>
  );
};
