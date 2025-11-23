import { UpdateAllCreatorProfilesModal } from '@/components/modals/UpdateAllCreatorProfilesModal';
import { UpdatePreviewOfVaultsModal } from '@/components/modals/UpdatePreviewOfVaultsModal';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import Link from 'next/link';
import { useState } from 'react';
import DeleteAllAssets from './DeleteAssets';

interface Props {
  setDeleteAllAssetsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuickActions: React.FC<Props> = ({ setDeleteAllAssetsModal }) => {
  const [openUpdateAllCreatorsModal, setOpenUpdateAllCreatorsModal] = useState<boolean>(false);
  const [updateVaultPreviewModal, setUpdateVaultPreviewModal] = useState<boolean>(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Link href={'/vaults'}>
          <Button>Connect to a service</Button>
        </Link>
        <Button variant="outline" className="w-full justify-start">
          Export settings
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => setOpenUpdateAllCreatorsModal(true)}>
          Update all creator profiles
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => setUpdateVaultPreviewModal(true)}>
          Update all vault previews
        </Button>
        <Button variant="destructive" className="w-full justify-start">
          Reset to defaults
        </Button>
        <UpdatePreviewOfVaultsModal isOpen={updateVaultPreviewModal} onClose={() => setUpdateVaultPreviewModal(false)} />
        <DeleteAllAssets setDeleteAllAssetsModal={setDeleteAllAssetsModal} />
        <UpdateAllCreatorProfilesModal isOpen={openUpdateAllCreatorsModal} onClose={() => setOpenUpdateAllCreatorsModal(false)} />
      </CardContent>
    </Card>
  );
};
