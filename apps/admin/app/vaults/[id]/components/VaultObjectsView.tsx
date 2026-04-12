'use client';

import { CleanUpModal } from '@/components/CleanUpModal';
import { BatchDownloadModal } from '@/components/BatchDownloadModal';
import { ImportProgress } from '@/components/ImportProgress';

import { useUser } from '@/hooks/useUser';
import { useVaultObjects } from '@/hooks/useVaults';
import { DataFetchType, DownloadStates, FileType } from '@workspace/gql/generated/graphql';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { Database, Users } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { VaultObjectsFilters } from './VaultObjectsFilters';
import { VaultObjectsTable } from './VaultObjectsTable';
import { VaultsList } from './VaultsList';
import VaultObjectsHeader from './VaultObjectsHeader';

interface VaultObjectsViewProps {
  id: string;
}

export function VaultObjectsView({ id }: VaultObjectsViewProps) {
  const [activeTab, setActiveTab] = useState<'objects' | 'vaults'>('objects');
  const [status, setStatus] = useState<DownloadStates[]>(Object.values(DownloadStates));
  const [fileTypes, setFileTypes] = useState<FileType[]>(Object.values(FileType));
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState<boolean>(false);
  const [isCleanupModalOpen, setIsCleanupModalOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as 'vaults' | 'objects' | null;
  const router = useRouter();
  const pathname = usePathname();

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
        onBatchDownload={() => setIsBatchModalOpen(true)}
        onOpenCleanup={() => setIsCleanupModalOpen(true)}
      />

      <ImportProgress />

      {isCleanupModalOpen && (
        <CleanUpModal
          isOpen={isCleanupModalOpen}
          onClose={() => setIsCleanupModalOpen(false)}
          creatorId={user?.id || id}
          creatorUsername={user?.username || ''}
        />
      )}

      <BatchDownloadModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        selectedIds={selectedObjects}
        onSuccess={() => {
          setIsBatchModalOpen(false);
          setSelectedObjects([]);
        }}
        type="vaultObject"
        creatorId={user?.id || id}
      />

      {activeTab === 'objects' && (
        <div className="w-full sm:w-auto">
          <VaultObjectsFilters status={status} setStatus={setStatus} fileTypes={fileTypes} setFileTypes={setFileTypes} />
        </div>
      )}

      <Tabs
        value={activeTab}
        defaultValue="objects"
        className="w-full space-y-4 md:space-y-6"
        onValueChange={(value) => handleTabChange(value as 'vaults' | 'objects')}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-primary/5 pb-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <TabsList className="bg-primary/5 border border-primary/5 p-0.5 h-10 shrink-0">
              <TabsTrigger
                value="objects"
                className="flex-1 sm:flex-none px-4 md:px-6 h-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/10 font-black uppercase tracking-tighter text-[10px] gap-2 transition-all duration-300"
              >
                <Users className="h-4 w-4" />
                Objects
              </TabsTrigger>
              <TabsTrigger
                value="vaults"
                className="flex-1 sm:flex-none px-4 md:px-6 h-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/10 font-black uppercase tracking-tighter text-[10px] gap-2 transition-all duration-300"
              >
                <Database className="h-4 w-4" />
                Vaults
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap items-center gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab === 'objects' ? vaultObjects.length : 'discovery'}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2 pl-2"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] md:text-xs text-primary font-black uppercase tracking-widest whitespace-nowrap">
                    {activeTab === 'objects' ? (
                      <>
                        <span className="text-foreground">{vaultObjects.length}</span> Objects <span className="opacity-50">Loaded</span>
                      </>
                    ) : (
                      'Vault Discovery'
                    )}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
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
