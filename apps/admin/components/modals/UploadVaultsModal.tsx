'use client';

import { useMutation } from '@apollo/client/react';
import { DOWNLOAD_CREATOR_OBJECTS_AS_BATCH_MUTATION } from '@workspace/gql/api/vaultsAPI';
import { AssetType, GetUserQuery } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { Modal } from '@workspace/ui/modals/Modal';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  creatorData?: GetUserQuery;
  onJobAdded: () => unknown;
  onCancel: () => unknown;
  vaultObjectIds: string[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadVaultsModal: React.FC<Props> = ({ isOpen, setOpen, vaultObjectIds, onCancel, onJobAdded, creatorData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [destination, setDestination] = useState<AssetType>(AssetType.Private);
  const [downloadCreatorObjectsAsBatch] = useMutation(DOWNLOAD_CREATOR_OBJECTS_AS_BATCH_MUTATION);

  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  const handleUploadToVault = async () => {
    if (!vaultObjectIds.length) return;
    setLoading(true);
    try {
      if (!creatorData?.getUser.id) return;
      await downloadCreatorObjectsAsBatch({
        variables: {
          input: {
            creatorId: creatorData.getUser.id,
            vaultObjectIds,
            destination
          }
        }
      });
      onJobAdded();
      toast.success('Added to queue');
    } catch (error) {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      title={`Upload ${vaultObjectIds.length} objects to queue for processing`}
      description={`Objects are to be uploaded to ${creatorData?.getUser.username}`}
    >
      <div className="flex justify-center">
        <div className="gap-2 w-fit justify-self-start items-start flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{destination}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Media</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={destination} onValueChange={(val) => setDestination(val as AssetType)}>
                <DropdownMenuRadioItem value={AssetType.Private}>Private</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={AssetType.Archive}>Archive</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={AssetType.Hidden}>Hidden</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton onClick={handleUploadToVault} size="lg" title="Upload" loading={loading} />
      </div>
    </Modal>
  );
};
