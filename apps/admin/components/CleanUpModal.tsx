'use client';

import { useVaultsActions } from '@workspace/gql/actions';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface CleanUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorId: string | null;
  creatorUsername?: string;
  onSuccess?: () => void;
}

export function CleanUpModal({ isOpen, onClose, creatorId, creatorUsername, onSuccess }: CleanUpModalProps) {
  const { cleanUpVaultObjectsOfACreatorMutation } = useVaultsActions();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const [loading, setLoading] = useState(false);

  const handleCleanUp = async () => {
    if (!creatorId) return;

    setLoading(true);
    try {
      const res = await cleanUpVaultObjectsOfACreatorMutation({ creatorId });
      const result = res.data?.cleanUpVaultObjectsOfACreator;

      successHandler({
        message: `Cleanup successful. Affected: ${result?.affected || 0} objects.`
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-500">
              <Trash2 className="h-6 w-6" />
            </div>
            <DialogTitle className="text-xl">Clean Up Vault Objects</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to clean up vault objects for{' '}
            <span className="font-bold text-foreground">{creatorUsername || 'this creator'}</span>? This action may remove rejected or
            invalid objects and re-sync status.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleCleanUp} disabled={loading} variant="default" className="bg-amber-500 hover:bg-amber-600">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cleaning...
              </>
            ) : (
              'Confirm Cleanup'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
