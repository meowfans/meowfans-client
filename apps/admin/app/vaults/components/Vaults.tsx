'use client';

import { TerminateDownloadingModal } from '@/components/modals/TerminateDownloadingModal';
import { TerminateImportingJobsModal } from '@/components/modals/TerminateImportingJobsModal';
import { useCreatorsStore } from '@/hooks/store/creators.store';
import { useCreators } from '@/hooks/useCreators';
import { handleScrollToTheEnd, handleScrollToTheTop } from '@/util/helpers';
import { DownloadStates, SortBy, UsersEntity } from '@workspace/gql/generated/graphql';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { Paginate } from '@workspace/ui/globals/Paginate';
import { ScrollToTheBottom } from '@workspace/ui/globals/ScrollToTheBottom';
import { ScrollToTheTop } from '@workspace/ui/globals/ScrollToTheTop';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { VaultTableRow } from './VaultTableRow';
import { VaultUrls } from './VaultUrls';
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
    <PageManager className="flex flex-col h-screen overflow-hidden">
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

      <div className="flex-1 overflow-hidden relative">
        {sortedVaults && sortedVaults.length ? (
          <>
            <div className="block md:hidden h-full">
              <ScrollArea className="h-full w-full p-1">
                <div ref={topRef} />
                {sortedVaults.map((creator, idx) => (
                  <div key={creator.id ?? idx} className="flex flex-col rounded-md border my-1 p-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        checked={selectedCreatorIds.includes(creator.id)}
                        onCheckedChange={() => toggleCreatorSelection(creator.id)}
                      />
                      <span className="text-sm">{creator.id}</span>
                    </div>
                    <VaultUrls idx={idx} creator={creator} onJobAdded={handleRefetch} onUpdateCreator={handleUpdateCreator} />
                  </div>
                ))}
                <div ref={endRef} />
              </ScrollArea>
            </div>

            <div className="hidden md:block h-full">
              <ScrollArea className="h-full w-full rounded-md border">
                <div ref={topRef} />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12.5"></TableHead>
                      <TableHead className="w-12.5">#</TableHead>
                      <TableHead>Creator</TableHead>
                      {statusButtons.map((status) => (
                        <TableHead key={status.label} className="text-center">
                          <div className="flex items-center gap-2 justify-center" title={status.label}>
                            {status.icon}
                            <span className="capitalize hidden lg:inline-block">{status.label}</span>
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="hidden lg:table-cell">Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedVaults.map((creator, idx) => (
                      <VaultTableRow
                        key={creator.id ?? idx}
                        idx={idx}
                        creator={creator}
                        onJobAdded={handleRefetch}
                        onUpdateCreator={handleUpdateCreator}
                        isSelected={selectedCreatorIds.includes(creator.id)}
                        onSelect={() => toggleCreatorSelection(creator.id)}
                      />
                    ))}
                  </TableBody>
                </Table>
                <div ref={endRef} />
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <p>✨Looks like there is nothing here✨</p>
          </div>
        )}

        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <ScrollToTheTop onClick={() => handleScrollToTheTop(topRef)} />
          <ScrollToTheBottom onClick={() => handleScrollToTheEnd(endRef)} />
        </div>
      </div>

      <div className="p-2 border-t bg-background z-10">
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
