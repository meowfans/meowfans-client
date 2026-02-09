'use client';

import { useVaultsActions } from '@workspace/gql/actions';
import { AssetType, DownloadAllCreatorObjectsAsBatchInput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface BatchDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCreators: string[];
  onSuccess: () => void;
}

export function BatchDownloadModal({ isOpen, onClose, selectedCreators, onSuccess }: BatchDownloadModalProps) {
  const { downloadAllCreatorObjectsMutation } = useVaultsActions();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const input: DownloadAllCreatorObjectsAsBatchInput = {
        creatorIds: selectedCreators,
      };

      await downloadAllCreatorObjectsMutation(input);
      successHandler({ message: 'Batch download started successfully' });
      onSuccess();
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
          <DialogTitle>Download Vault Objects</DialogTitle>
          <DialogDescription>
            You are about to start a batch download for {selectedCreators.length} selected creator(s). This process will run in the
            background.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDownload} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting...
              </>
            ) : (
              'Start Download'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
