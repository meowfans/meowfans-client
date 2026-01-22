'use client';

import { TerminateDownloadingModal } from '@/components/modals/TerminateDownloadingModal';
import { TerminateImportingJobsModal } from '@/components/modals/TerminateImportingJobsModal';
import { useCreatorsStore } from '@/hooks/store/creators.store';
import { useCreators } from '@/hooks/useCreators';
import { handleScrollToTheEnd, handleScrollToTheTop } from '@/util/helpers';
import { DownloadStates, SortBy, UsersEntity } from '@workspace/gql/generated/graphql';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { Paginate } from '@workspace/ui/globals/Paginate';
import { ScrollToTheBottom } from '@workspace/ui/globals/ScrollToTheBottom';
import { ScrollToTheTop } from '@workspace/ui/globals/ScrollToTheTop';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { VaultTableRow } from './VaultTableRow';
import { VaultsHeader, statusButtons } from './VaultsHeader';

export const Vaults = () => {
  const searchParams = useSearchParams();
  const { setCreators } = useCreatorsStore();
  const endRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.VaultCount);
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>([]);
  const [filterBy, setFilterBy] = useState<DownloadStates>(DownloadStates.Pending);
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('p') || 1));
  const { creators, count, handleRefetch, hasNext, hasPrev, totalPages } = useCreators({ pageNumber, sortBy });

  const toggleCreatorSelection = (creatorId: string) => {
    setSelectedCreatorIds((prev) => (prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId]));
  };

  const handleSelectN = (n: number) => {
    const ids = creators
      .filter((v) => v.creatorProfile.pendingObjectCount !== 0)
      .slice(0, n)
      .map((v) => v.id);
    setSelectedCreatorIds(ids);
  };

  const filteredCreatorVaults = filterText
    ? creators.filter((c) => c.id.toLowerCase().includes(filterText.toLowerCase()) || (c.username ?? '').includes(filterText.toLowerCase()))
    : creators;

  const handleSortVaults = (a: UsersEntity, b: UsersEntity) => {
    const final = b.creatorProfile;
    const initial = a.creatorProfile;
    switch (filterBy) {
      case DownloadStates.Rejected:
        return final.rejectedObjectCount - initial.rejectedObjectCount;
      case DownloadStates.Pending:
        return final.pendingObjectCount - initial.pendingObjectCount;
      case DownloadStates.Processing:
        return final.processingObjectCount - initial.processingObjectCount;
      case DownloadStates.Fulfilled:
        return final.fulfilledObjectCount - initial.fulfilledObjectCount;
      default:
        return final.pendingObjectCount - initial.pendingObjectCount;
    }
  };

  const sortedVaults = filteredCreatorVaults?.slice().sort((a, b) => handleSortVaults(a, b));

  const handleUpdateCreator = (c: UsersEntity) => {
    setCreators([
      ...creators.map((cre) => {
        return cre.id === c.id ? c : cre;
      })
    ]);
  };

  return (
    <PageManager>
      <VaultsHeader
        sortBy={sortBy}
        onSortBy={(val) => setSortBy(val)}
        setSelectedCreatorIds={setSelectedCreatorIds}
        onRefetch={handleRefetch}
        onSelectN={handleSelectN}
        filterBy={filterBy}
        count={count ?? 0}
        onFilter={setFilterText}
        selectedCreatorIds={selectedCreatorIds}
        onFilterBy={(stats) => setFilterBy(stats)}
      />
      <div className="overflow-x-auto">
        <div ref={topRef} />
        {sortedVaults && sortedVaults.length ? (
          <Table className="overflow-x-auto">
            <TableHeader className="z-30 bg-muted/50 backdrop-blur">
              <TableRow>
                <TableHead className="sticky left-0 z-20 bg-card">User</TableHead>
                <TableHead className="w-12.5"></TableHead>
                {statusButtons.map((status) => (
                  <TableHead key={status.label} className="text-center">
                    <div className="flex items-center gap-2 justify-center" title={status.label}>
                      {status.icon}
                      <span className="capitalize inline-block">{status.label}</span>
                    </div>
                  </TableHead>
                ))}
                <TableHead className="table-cell">Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVaults.map((user, idx) => (
                <VaultTableRow
                  key={user.id ?? idx}
                  idx={idx}
                  user={user}
                  onJobAdded={handleRefetch}
                  onUpdateCreator={handleUpdateCreator}
                  isSelected={selectedCreatorIds.includes(user.id)}
                  onSelect={() => toggleCreatorSelection(user.id)}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-4">
            <p>✨Looks like there is nothing here✨</p>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-4 right-4 z-10 flex gap-2">
        <ScrollToTheTop onClick={() => handleScrollToTheTop(topRef)} />
        <ScrollToTheBottom onClick={() => handleScrollToTheEnd(endRef)} />
      </div>

      <div className="p-2 sticky md:bottom-0 bottom-16 border-t bg-background z-10">
        <Paginate
          hasNext={!!hasNext}
          hasPrev={!!hasPrev}
          pageNumber={pageNumber}
          totalPages={totalPages ?? 0}
          setPageNumber={setPageNumber}
        />
      </div>

      <TerminateImportingJobsModal />
      <TerminateDownloadingModal />
    </PageManager>
  );
};
