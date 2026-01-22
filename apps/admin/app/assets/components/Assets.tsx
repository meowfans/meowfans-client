'use client';

import { useCreators } from '@/hooks/useCreators';
import { SortBy, UsersEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { Edit, GalleryThumbnailsIcon, GalleryVertical } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const Assets = () => {
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('p') || 1));
  const topRef = useRef<HTMLDivElement>(null);
  const [allCreators, setAllCreators] = useState<UsersEntity[]>([]);

  const { creators, hasNext, loading } = useCreators({
    pageNumber,
    sortBy: SortBy.AssetCount
  });

  useEffect(() => {
    if (!loading && creators.length > 0) {
      if (pageNumber === 1) {
        setAllCreators(creators);
      } else {
        setAllCreators((prev) => {
          const newIds = new Set(creators.map((c) => c.id));
          const existing = prev.filter((c) => !newIds.has(c.id));
          return [...existing, ...creators];
        });
      }
    }
  }, [creators, loading, pageNumber]);

  return (
    <PageManager>
      {creators.length ? (
        <InfiniteScrollManager
          dataLength={allCreators.length}
          hasMore={!!hasNext}
          onLoadMore={() => setPageNumber((prev) => prev + 1)}
          loading={loading}
        >
          <div ref={topRef} />
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-30 backdrop-blur-sm">
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="min-w-35 sm:min-w-62.5">User</TableHead>
                <TableHead className="whitespace-nowrap min-w-37.5">Total Assets</TableHead>
                <TableHead className="text-right right-0 z-30 bg-card/95 backdrop-blur hidden md:table-cell">Actions</TableHead>
                <TableHead className="text-right md:hidden">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creators.map((creator) => (
                <TableRow key={creator.id} className="group hover:bg-muted/30 transition-colors">
                  <TableCell className="p-2 sm:p-4 sticky left-0 bg-card">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-background ring-2 ring-muted/20">
                        <AvatarImage src={creator.avatarUrl ?? MEOW_FANS_AVATAR} className="object-cover" />
                        <AvatarFallback className="bg-primary/10 text-primary uppercase font-bold text-xs sm:text-sm">
                          {creator.username?.[0] || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold truncate text-foreground text-sm sm:text-base">{creator.username}</span>
                        <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                          {creator.firstName || ''} {creator.lastName || ''}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground">{creator.creatorProfile.assetCount ?? 0} Assets</TableCell>
                  <TableCell className="text-right p-2 sm:p-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/assets/${creator.username}?p=${pageNumber}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-xs sm:text-sm px-2 sm:px-3"
                        >
                          <GalleryThumbnailsIcon className="w-3.5 h-3.5 sm:mr-1.5" />
                          <span className="hidden sm:inline">Assets</span>
                        </Button>
                      </Link>

                      <Link href={`/vaults/${creator.username}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-xs sm:text-sm px-2 sm:px-3"
                        >
                          <GalleryThumbnailsIcon className="w-3.5 h-3.5 sm:mr-1.5" />
                          <span className="hidden sm:inline">Vaults</span>
                        </Button>
                      </Link>
                      <Link href={`/posts/${creator.username}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-xs sm:text-sm px-2 sm:px-3"
                        >
                          <GalleryVertical className="w-3.5 h-3.5 sm:mr-1.5" />
                          <span className="hidden sm:inline">Posts</span>
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-xs sm:text-sm px-2 sm:px-3"
                      >
                        <Edit className="w-3.5 h-3.5 sm:mr-1.5" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScrollManager>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
          <p className="text-lg">No creators found</p>
        </div>
      )}
    </PageManager>
  );
};
