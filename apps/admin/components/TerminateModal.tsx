'use client';

import { useVaultsActions } from '@workspace/gql/actions';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { AlertCircle, Ban, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface TerminateModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'downloading' | 'all';
}

export function TerminateModal({ isOpen, onClose, type }: TerminateModalProps) {
  const { terminateDownloadingMutation, terminateAllJobsMutation } = useVaultsActions();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const [loading, setLoading] = useState(false);

  const isAll = type === 'all';
  const title = isAll ? 'Terminate All Jobs' : 'Terminate Downloading';
  const description = isAll
    ? 'Are you sure you want to completely stop ALL background jobs? This action cannot be undone and may leave tasks in an inconsistent state.'
    : 'Are you sure you want to stop all active download tasks? Currenly downloading files will be interrupted.';

  const handleTerminate = async () => {
    setLoading(true);
    try {
      if (isAll) {
        await terminateAllJobsMutation();
      } else {
        await terminateDownloadingMutation();
      }
      successHandler({ message: `${isAll ? 'All jobs' : 'Downloading tasks'} terminated successfully` });
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
            <div className="p-2 rounded-full bg-destructive/10 text-destructive">
              {isAll ? <Ban className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
            </div>
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleTerminate} disabled={loading} variant="destructive">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Terminating...
              </>
            ) : (
              'Confirm Termination'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
