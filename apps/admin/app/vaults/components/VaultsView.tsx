'use client';

import { BatchDownloadModal } from '@/components/BatchDownloadModal';
import { CleanUpModal } from '@/components/CleanUpModal';
import { ImportProgress } from '@/components/ImportProgress';
import { TerminateModal } from '@/components/TerminateModal';
import { useImpersonationStore } from '@/hooks/store/impersonation.store';
import { useCreators } from '@/hooks/useCreators';
import { useGetAllObjectsCount } from '@/hooks/useVaults';
import { DataFetchType, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { VaultsHeader } from './VaultsHeader';
import { VaultsStats } from './VaultsStats';
import { VaultsTable } from './VaultsTable';

export function VaultsView() {
 const {
 creators,
 loading: creatorsLoading,
 hasMore: creatorsHasMore,
 handleLoadMore: creatorsLoadMore
 } = useCreators({ take: 50, dataFetchType: DataFetchType.InfiniteScroll, sortBy: SortBy.CreatorPendingCount, orderBy: SortOrder.Desc });

 const { objectsCount, fetchCounts } = useGetAllObjectsCount();
 const { onOpen } = useImpersonationStore();
 const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
 const [isBatchModalOpen, setIsBatchModalOpen] = useState<boolean>(false);
 const [cleanupModalData, setCleanupModalData] = useState<{ id: string; username: string } | null>(null);

 useEffect(() => {
 fetchCounts();
 }, []); // eslint-disable-line

 const handleSelectAll = (checked: boolean) => {
 if (checked) {
  setSelectedCreators(creators.map((c) => c.id));
 } else {
  setSelectedCreators([]);
 }
 };

 const handleSelectCreator = (creatorId: string, checked: boolean) => {
 if (checked) {
  setSelectedCreators((prev) => (prev ? [...prev, creatorId] : [creatorId]));
 } else {
  setSelectedCreators((prev) => prev?.filter((id) => id !== creatorId) ?? null);
 }
 };

 return (
 <div className="space-y-6 md:space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto flex flex-col min-h-full w-full min-w-0">
  <VaultsHeader selectedCount={selectedCreators?.length ?? 0} onStartBatchDownload={() => setIsBatchModalOpen(true)} />

  <ImportProgress />
  <VaultsStats objectsCount={objectsCount} />
  <VaultsTable
  creators={creators}
  loading={creatorsLoading}
  hasMore={creatorsHasMore}
  onLoadMore={creatorsLoadMore}
  selectedCreators={selectedCreators ?? []}
  onSelectAll={handleSelectAll}
  onSelectCreator={handleSelectCreator}
  onOpenCleanup={(id, username) => setCleanupModalData({ id, username })}
  onImpersonate={onOpen}
  />

  <BatchDownloadModal
  isOpen={!!selectedCreators?.length && isBatchModalOpen}
  onClose={() => {
   setIsBatchModalOpen(false);
   setSelectedCreators([]);
  }}
  selectedIds={selectedCreators}
  onSuccess={() => {
   setIsBatchModalOpen(false);
   setSelectedCreators([]);
  }}
  type="creator"
  />

  <TerminateModal />

  {cleanupModalData && (
  <CleanUpModal
   isOpen={!!cleanupModalData}
   onClose={() => setCleanupModalData(null)}
   creatorId={cleanupModalData.id}
   creatorUsername={cleanupModalData.username}
  />
  )}
 </div>
 );
}
