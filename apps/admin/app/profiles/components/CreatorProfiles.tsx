import { useCreators } from '@/hooks/useCreators';
import { handleScrollToTheEnd, handleScrollToTheTop } from '@/util/helpers';
import { SortBy, UsersEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { Paginate } from '@workspace/ui/globals/Paginate';
import { ScrollToTheBottom } from '@workspace/ui/globals/ScrollToTheBottom';
import { ScrollToTheTop } from '@workspace/ui/globals/ScrollToTheTop';
import { RefreshCcw, Search, Shield } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { CreatorProfilesArea } from './CreatorProfilesArea';

export const CreatorProfiles = () => {
  const searchParams = useSearchParams();
  const endRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('p') || 1));
  const { count, creators, handleRefetch, hasNext, hasPrev, totalPages } = useCreators({
    pageNumber,
    sortBy: SortBy.AssetCount
  });

  const filteredCreators = filterText
    ? creators.filter(
        (c) =>
          (c.id.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
          (c.username?.toLowerCase() ?? '').includes(filterText.toLowerCase())
      )
    : creators;

  return (
    <PageManager className="w-full bg-linear-to-b from-slate-50 to-white dark:from-zinc-900 dark:to-black">
      <div className="flex flex-col justify-between sticky bg-background z-10 py-3 space-y-1 px-4 border-b shadow-sm">
        <div className="flex flex-row items-center gap-3">
          <Button variant="secondary" className="rounded-full">
            <Shield className="h-4 w-4 mr-1" /> {count} Creators
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search creators..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-8 max-w-sm"
            />
          </div>
        </div>
        <div className="w-full flex">
          <Button variant="outline" className="hover:scale-105 transition-transform rounded-full" onClick={handleRefetch}>
            <RefreshCcw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>
      <div className="relative h-full">
        <ScrollArea className="h-[calc(100vh-150px)] w-full p-4">
          <div ref={topRef} />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCreators
              .slice()
              .sort((a, b) => (b.creatorProfile.assetCount ?? 0) - (a.creatorProfile.assetCount ?? 0))
              .map((creator) => (
                <div key={creator.id} className="hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CreatorProfilesArea creator={creator as UsersEntity} />
                </div>
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
    </PageManager>
  );
};
