'use client';

import { useVaultMutations } from '@/hooks/useVaults';
import { Button } from '@workspace/ui/components/button';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { Modal } from '@workspace/ui/modals/Modal';
import { AlertCircle, Trash2 } from 'lucide-react';

interface CleanUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorId: string | null;
  creatorUsername?: string;
  onSuccess?: () => void;
}

export function CleanUpModal({ isOpen, onClose, creatorId, creatorUsername, onSuccess }: CleanUpModalProps) {
  const { cleanUpVaultObjectsOfACreator, loading } = useVaultMutations();

  const handleCleanUp = async () => {
    if (!creatorId) return;

    await cleanUpVaultObjectsOfACreator({ creatorId });
    onSuccess?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-destructive" />
          <span className="font-black uppercase tracking-tighter">Clean Up Vault</span>
        </div>
      }
      description={
        <span>
          Are you sure you want to clean up vault objects for{' '}
          <span className="font-bold text-foreground">{creatorUsername || 'this creator'}</span>?
        </span>
      }
    >
      <div className="flex flex-col gap-6 py-4">
        <div className="flex items-center gap-3 p-4 rounded-xl border border-destructive/10 bg-destructive/5 text-destructive/80">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-semibold leading-relaxed uppercase tracking-tight">
            This action may remove rejected or invalid objects and re-sync their processing status. This cannot be undone.
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
            onClick={handleCleanUp}
            className="flex-1 font-black uppercase tracking-tight shadow-lg shadow-destructive/20 rounded-xl h-11"
            variant="destructive"
          >
            Confirm Cleanup
          </LoadingButtonV2>
        </div>
      </div>
    </Modal>
  );
}
