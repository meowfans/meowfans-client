'use client';

import { AssetType, UsersEntity } from '@workspace/gql/generated/graphql';

import { useMutation } from '@apollo/client/react';
import { GET_CREATORS_BY_ADMIN_QUERY } from '@workspace/gql/api';
import { DOWNLOAD_ALL_CREATOR_OBJECTS_MUTATION } from '@workspace/gql/api/downloadAPI';
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
  onJobAdded: () => unknown;
  onCancel: () => unknown;
  user: UsersEntity;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DownloadCreatorsAllVaultsModal: React.FC<Props> = ({ isOpen, setOpen, user, onCancel, onJobAdded }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [destination, setDestination] = useState<AssetType>(AssetType.Private);
  const [uploadVaults] = useMutation(DOWNLOAD_ALL_CREATOR_OBJECTS_MUTATION, {
    refetchQueries: () => {
      return [{ query: GET_CREATORS_BY_ADMIN_QUERY, variables: { input: { limit: 30 } } }];
    }
  });

  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  const handleUploadToVault = async () => {
    setLoading(true);
    try {
      await uploadVaults({
        variables: { input: { creatorIds: [user.id] } }
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
      title={`Upload started for ${user.username}`}
      description={`Total objects ${(user?.creatorProfile?.pendingObjectCount ?? 0) + (user?.creatorProfile?.rejectedObjectCount ?? 0)}`}
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
