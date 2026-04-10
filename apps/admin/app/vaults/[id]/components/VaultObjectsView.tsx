'use client';

import { CleanUpModal } from '@/components/CleanUpModal';
import { ImportProgress } from '@/components/ImportProgress';
import { TerminateModal } from '@/components/TerminateModal';

import { useUser } from '@/hooks/useUser';
import { useVaultObjects } from '@/hooks/useVaults';
import { useVaultsActions } from '@workspace/gql/actions';
import { DataFetchType, DownloadStates, FileType, UploadVaultQueueInput } from '@workspace/gql/generated/graphql';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { Database, Users } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { VaultObjectsFilters } from './VaultObjectsFilters';
import { VaultObjectsHeader } from './VaultObjectsHeader';
import { VaultObjectsTable } from './VaultObjectsTable';
import { VaultsList } from './VaultsList';

interface VaultObjectsViewProps {
  id: string;
}

export function VaultObjectsView({ id }: VaultObjectsViewProps) {
  const [activeTab, setActiveTab] = useState('objects');
  const [status, setStatus] = useState<DownloadStates[]>(Object.values(DownloadStates));
  const [fileTypes, setFileTypes] = useState<FileType[]>(Object.values(FileType));
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [terminateModalType, setTerminateModalType] = useState<'downloading' | 'all' | null>(null);
  const [isCleanupModalOpen, setIsCleanupModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as 'vaults' | 'objects' | null;
  const router = useRouter();
  const pathname = usePathname();

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

  const handleTabChange = (tab: 'vaults' | 'objects') => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

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

      <ImportProgress />

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

      <Tabs
        value={activeTab}
        defaultValue="objects"
        className="w-full space-y-6 md:space-y-8"
        onValueChange={(value) => handleTabChange(value as 'vaults' | 'objects')}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-primary/10 pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <TabsList className="bg-primary/5 border border-primary/10 p-1 h-11 shrink-0">
              <TabsTrigger
                value="objects"
                className="px-4 md:px-6 h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black italic uppercase tracking-tighter text-xs gap-2 transition-all"
              >
                <Users className="h-4 w-4" />
                Objects
              </TabsTrigger>
              <TabsTrigger
                value="vaults"
                className="px-4 md:px-6 h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black italic uppercase tracking-tighter text-xs gap-2 transition-all"
              >
                <Database className="h-4 w-4" />
                Vaults
              </TabsTrigger>
            </TabsList>

            {activeTab === 'objects' && <div className="hidden sm:block h-6 w-px bg-primary/10 mx-2" />}

            {activeTab === 'objects' && (
              <VaultObjectsFilters status={status} setStatus={setStatus} fileTypes={fileTypes} setFileTypes={setFileTypes} />
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] whitespace-nowrap">
              {activeTab === 'objects' ? `${vaultObjects.length} Objects Loaded` : 'Vault Discovery'}
            </span>
          </div>
        </div>

        <TabsContent value="objects" className="mt-0 focus-visible:outline-none min-h-100">
          <VaultObjectsTable
            vaultObjects={vaultObjects}
            selectedObjects={selectedObjects}
            onSelectAll={handleSelectAll}
            onSelectObject={handleSelectObject}
            loading={loading}
            hasNext={hasNext}
            onLoadMore={handleLoadMore}
          />
        </TabsContent>

        <TabsContent value="vaults" className="mt-0 focus-visible:outline-none min-h-100">
          {activeTab === 'vaults' && <VaultsList />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
