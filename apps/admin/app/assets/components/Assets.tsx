'use client';

import { useCreators } from '@/hooks/useCreators';
import { handleScrollToTheEnd, handleScrollToTheTop } from '@/util/helpers';
import { SortBy, UsersEntity } from '@workspace/gql/generated/graphql';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { Paginate } from '@workspace/ui/globals/Paginate';
import { ScrollToTheBottom } from '@workspace/ui/globals/ScrollToTheBottom';
import { ScrollToTheTop } from '@workspace/ui/globals/ScrollToTheTop';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { AssetCards } from './AssetCards';
import { AssetsHeader } from './AssetsHeader';

export const Assets = () => {
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('p') || 1));
  const [filterText, setFilterText] = useState<string>('');
  const endRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const { creators, hasMore, hasNext, loading, count, hasPrev, totalPages } = useCreators({
    pageNumber,
    sortBy: SortBy.AssetCount
  });

  const filteredCreators = filterText
    ? creators.filter(
        (c) =>
          c.id.toLowerCase().includes(filterText.toLowerCase()) ||
          (c.firstName?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
          (c.username?.toLowerCase() ?? '').includes(filterText.toLowerCase())
      )
    : creators;

  return (
    <PageManager className="w-full">
      <AssetsHeader count={count ?? 0} filterText={filterText} onChangeFilterText={setFilterText} onRefetch={() => null} />
      {filteredCreators && filteredCreators.length ? (
        <div className="relative h-full">
          <ScrollArea className="h-[calc(100vh-150px)] w-full p-4">
            <div ref={topRef} />
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCreators
                .slice()
                .sort((a, b) => (b.creatorProfile.assetCount ?? 0) - (a.creatorProfile.assetCount ?? 0))
                .map((creator, idx) => (
                  <AssetCards key={creator.id ?? idx} creator={creator as UsersEntity} pageNumber={pageNumber} />
                ))}
            </div>
            <div ref={endRef} />
          </ScrollArea>

          <ScrollToTheTop onClick={() => handleScrollToTheTop(topRef)} />
          <ScrollToTheBottom onClick={() => handleScrollToTheEnd(endRef)} />
          <Paginate
            hasNext={!!hasNext}
            hasPrev={!!hasPrev}
            pageNumber={pageNumber}
            totalPages={totalPages ?? 0}
            setPageNumber={setPageNumber}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
          <p>No creators found</p>
        </div>
      )}
    </PageManager>
  );
};
