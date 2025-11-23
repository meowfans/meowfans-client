'use client';

import { TerminateDownloadingModal } from '@/components/modals/TerminateDownloadingModal';
import { TerminateImportingJobsModal } from '@/components/modals/TerminateImportingJobsModal';
import { useCreators } from '@/hooks/useCreators';
import { handleScrollToTheEnd, handleScrollToTheTop } from '@/util/helpers';
import { DownloadStates, ExtendedUsersEntity, SortBy } from '@workspace/gql/generated/graphql';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { Paginate } from '@workspace/ui/globals/Paginate';
import { ScrollToTheBottom } from '@workspace/ui/globals/ScrollToTheBottom';
import { ScrollToTheTop } from '@workspace/ui/globals/ScrollToTheTop';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { VaultsHeader } from './VaultsHeader';
import { VaultUrls } from './VaultUrls';

export const Vaults = () => {
  const searchParams = useSearchParams();
  const endRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.VaultCount);
  const [filterBy, setFilterBy] = useState<DownloadStates>(DownloadStates.Pending);
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('p') || 1));
  const { creators, count, handleRefetch, hasNext, hasPrev, setCreators, totalPages } = useCreators({ pageNumber, sortBy });

  const toggleCreatorSelection = (creatorId: string) => {
    setSelectedCreatorIds((prev) => (prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId]));
  };

  const handleSelectN = (n: number) => {
    const ids = creators
      .filter((v) => v.pendingObjectCount !== 0)
      .slice(0, n)
      .map((v) => v.id);
    setSelectedCreatorIds(ids);
  };

  const filteredCreatorVaults = filterText
    ? creators.filter((c) => c.id.toLowerCase().includes(filterText.toLowerCase()) || (c.username ?? '').includes(filterText.toLowerCase()))
    : creators;

  const handleSortVaults = (a: ExtendedUsersEntity, b: ExtendedUsersEntity) => {
    switch (filterBy) {
      case DownloadStates.Rejected:
        return b.rejectedObjectCount - a.rejectedObjectCount;
      case DownloadStates.Pending:
        return b.pendingObjectCount - a.pendingObjectCount;
      case DownloadStates.Processing:
        return b.processingObjectCount - a.processingObjectCount;
      case DownloadStates.Fulfilled:
        return b.fulfilledObjectCount - a.fulfilledObjectCount;
      default:
        return b.pendingObjectCount - a.pendingObjectCount;
    }
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
        count={count}
        onFilter={setFilterText}
        selectedCreatorIds={selectedCreatorIds}
        onFilterBy={(stats) => setFilterBy(stats)}
      />
      {filteredCreatorVaults && filteredCreatorVaults.length ? (
        <div className="relative h-full">
          <ScrollArea className="h-[calc(100vh-140px)] w-full p-1">
            <div ref={topRef} />
            {filteredCreatorVaults
              .slice()
              .sort((a, b) => handleSortVaults(a, b))
              .map((creator, idx) => (
                <div key={creator.id ?? idx} className="flex flex-col rounded-md border my-1 p-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      checked={selectedCreatorIds.includes(creator.id)}
                      onCheckedChange={() => toggleCreatorSelection(creator.id)}
                    />
                    <span className="text-sm">{creator.id}</span>
                  </div>
                  <VaultUrls
                    idx={idx}
                    creator={creator}
                    onJobAdded={handleRefetch}
                    onUpdateCreator={(c) =>
                      setCreators([
                        ...creators.map((cre) => {
                          return cre.id === c.id ? c : cre;
                        })
                      ])
                    }
                  />
                </div>
              ))}
            <div ref={endRef} />
          </ScrollArea>
          <ScrollToTheTop onClick={() => handleScrollToTheTop(topRef)} />
          <ScrollToTheBottom onClick={() => handleScrollToTheEnd(endRef)} />
          <Paginate hasNext={hasNext} hasPrev={hasPrev} pageNumber={pageNumber} totalPages={totalPages} setPageNumber={setPageNumber} />
        </div>
      ) : (
        <div className="text-center">
          <p>✨Looks like there is nothing here✨</p>
        </div>
      )}

      <TerminateImportingJobsModal />
      <TerminateDownloadingModal />
    </PageManager>
  );
};
