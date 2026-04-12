'use client';

import { useAdmin } from '@/hooks/context/AdminContextWrapper';
import { useVaultMutations } from '@/hooks/useVaults';
import { AssetType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { Modal } from '@workspace/ui/modals/Modal';
import { AlertCircle, Download } from 'lucide-react';

interface BatchDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  onSuccess: () => void;
  creatorId?: string;
  type: 'creator' | 'vaultObject';
}

export function BatchDownloadModal({ isOpen, onClose, selectedIds, onSuccess, creatorId, type }: BatchDownloadModalProps) {
  const { admin } = useAdmin();
  const { downloadObjectByVaultObjectIds, downloadObjectsByCreatorIds, loading } = useVaultMutations();

  const handleDownload = async () => {
    try {
      if (type === 'creator') {
        await downloadObjectsByCreatorIds({ creatorIds: selectedIds });
      } else {
        await downloadObjectByVaultObjectIds({
          vaultObjectIds: selectedIds,
          creatorId: creatorId as string,
          adminId: admin.user?.id as string,
          destination: AssetType.Private
        });
      }
    } finally {
      onSuccess();
      onClose();
    }
  };

  const isCreatorType = type === 'creator';
  const entityName = isCreatorType ? 'creator(s)' : 'vault object(s)';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          <span className="font-black uppercase tracking-tighter">Batch Download</span>
        </div>
      }
      description={`Initiate background download for ${selectedIds?.length || 0} selected ${entityName}.`}
    >
      <div className="flex flex-col gap-6 py-4">
        <div className="flex items-center gap-3 p-4 rounded-xl border border-primary/10 bg-primary/5 text-primary/80">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-semibold leading-relaxed uppercase tracking-tight">
            {isCreatorType
              ? 'This will queue a global batch download job for all objects belonging to these creators.'
              : 'This will queue a download job for the specific vault objects selected.'}
            Processing time depends on the total data volume.
          </p>
        </div>

        <div className="flex gap-3 mt-2">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="flex-1 font-bold uppercase tracking-tight rounded-xl h-11"
          >
            Cancel
          </Button>
          <LoadingButtonV2
            loading={loading}
            onClick={handleDownload}
            className="flex-1 font-black uppercase tracking-tight shadow-lg shadow-primary/20 rounded-xl h-11"
            variant="secondary"
          >
            Confirm & Start
          </LoadingButtonV2>
        </div>
      </div>
    </Modal>
  );
}
