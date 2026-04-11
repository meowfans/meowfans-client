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
  type: 'downloading' | 'importing';
}

export function TerminateModal({ isOpen, onClose, type }: TerminateModalProps) {
  const { terminateDownloadingMutation, terminateAllJobsMutation } = useVaultsActions();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const [loading, setLoading] = useState(false);

  const title = type === 'importing' ? 'Terminate All Jobs' : 'Terminate Downloading';
  const description =
    type === 'importing'
      ? 'Are you sure you want to completely stop ALL background jobs? This action cannot be undone and may leave tasks in an inconsistent state.'
      : 'Are you sure you want to stop all active download tasks? Currenly downloading files will be interrupted.';

  const handleTerminate = async () => {
    setLoading(true);
    try {
      if (type === 'importing') {
        await terminateAllJobsMutation();
      } else {
        await terminateDownloadingMutation();
      }
      successHandler({ message: `${type === 'importing' ? 'All jobs' : 'Downloading tasks'} terminated successfully` });
      onClose();
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[106.25">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-destructive/10 text-destructive">
              {type === 'importing' ? <Ban className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
            </div>
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading} className="w-full sm:w-auto order-2 sm:order-1 font-bold">
            Cancel
          </Button>
          <Button
            onClick={handleTerminate}
            disabled={loading}
            variant="destructive"
            className="w-full sm:w-auto order-1 sm:order-2 font-bold"
          >
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
