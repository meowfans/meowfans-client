'use client';

import { CleanUpModal } from '@/components/CleanUpModal';
import { TerminateModal } from '@/components/TerminateModal';

import { useUser } from '@/hooks/useUser';
import { useVaultObjects } from '@/hooks/useVaults';
import { useVaultsActions } from '@workspace/gql/actions';
import { DataFetchType, DownloadStates, FileType, UploadVaultQueueInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useMemo, useState } from 'react';
import { VaultObjectsFilters } from './VaultObjectsFilters';
import { VaultObjectsHeader } from './VaultObjectsHeader';
import { VaultObjectsTable } from './VaultObjectsTable';

interface VaultObjectsViewProps {
  id: string;
}

export function VaultObjectsView({ id }: VaultObjectsViewProps) {
  const [status, setStatus] = useState<DownloadStates[]>(Object.values(DownloadStates));
  const [fileTypes, setFileTypes] = useState<FileType[]>(Object.values(FileType));
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [terminateModalType, setTerminateModalType] = useState<'downloading' | 'all' | null>(null);
  const [isCleanupModalOpen, setIsCleanupModalOpen] = useState(false);

  const { downloadCreatorObjectsAsBatchMutation } = useVaultsActions();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const { user } = useUser({ userIdOrName: id });

  const queryArgs = useMemo(
    () => ({
      relatedUserId: id,
      take: 100,
      dataFetchType: DataFetchType.InfiniteScroll,
      fileType: fileTypes.length > 0 ? fileTypes : undefined,
      status: status.length > 0 ? status : undefined
    }),
    [fileTypes, status, id]
  );

  const { vaultObjects, loading, hasNext, handleLoadMore } = useVaultObjects(queryArgs);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedObjects(vaultObjects.filter((v) => v.status !== DownloadStates.Fulfilled).map((obj) => obj.id));
    } else {
      setSelectedObjects([]);
    }
  };

  const handleSelectObject = (objectId: string, checked: boolean) => {
    if (checked) {
      setSelectedObjects((prev) => [...prev, objectId]);
    } else {
      setSelectedObjects((prev) => prev.filter((id) => id !== objectId));
    }
  };

  const handleBatchDownload = async () => {
    if (selectedObjects.length === 0) return;
    setIsProcessing(true);
    try {
      const input: UploadVaultQueueInput = {
        creatorId: id,
        vaultObjectIds: selectedObjects
      };
      await downloadCreatorObjectsAsBatchMutation(input);
      successHandler({ message: 'Batch download initiated for selected objects.' });
      setSelectedObjects([]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto flex flex-col min-h-full w-full min-w-0">
      <VaultObjectsHeader
        user={user}
        selectedCount={selectedObjects.length}
        totalFetched={vaultObjects.length}
        isProcessing={isProcessing}
        onBatchDownload={handleBatchDownload}
        onOpenCleanup={() => setIsCleanupModalOpen(true)}
        onOpenTerminate={setTerminateModalType}
      />

      {terminateModalType && (
        <TerminateModal isOpen={!!terminateModalType} onClose={() => setTerminateModalType(null)} type={terminateModalType} />
      )}

      {isCleanupModalOpen && (
        <CleanUpModal
          isOpen={isCleanupModalOpen}
          onClose={() => setIsCleanupModalOpen(false)}
          creatorId={user?.id || id}
          creatorUsername={user?.username || ''}
        />
      )}

      <VaultObjectsFilters status={status} setStatus={setStatus} fileTypes={fileTypes} setFileTypes={setFileTypes} />

      <VaultObjectsTable
        vaultObjects={vaultObjects}
        selectedObjects={selectedObjects}
        onSelectAll={handleSelectAll}
        onSelectObject={handleSelectObject}
        loading={loading}
        hasNext={hasNext}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}
