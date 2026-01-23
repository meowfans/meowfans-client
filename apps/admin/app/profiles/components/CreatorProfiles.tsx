'use client';

import { ImpersonateCreatorTrigger } from '@/components/ImpersonateTrigger';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder, UsersEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { cn } from '@workspace/ui/lib/utils';
import { Edit, GalleryVertical, GalleryVerticalEnd, Vault } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const CreatorProfiles = () => {
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('p') || 1));
  const topRef = useRef<HTMLDivElement>(null);
  const { setSwitchContext, switchContext } = useUtilsStore();
  const [allCreators, setAllCreators] = useState<UsersEntity[]>([]);
  const { creators, hasNext, loading } = useCreators({ pageNumber, sortBy: SortBy.AssetCount, orderBy: SortOrder.Desc });

  useEffect(() => {
    if (!loading && creators.length > 0) {
      if (pageNumber === 1) {
        setAllCreators(creators);
      } else {
        setAllCreators((prev) => {
          const ids = new Set(prev.map((c) => c.id));
          return [...prev, ...creators.filter((c) => !ids.has(c.id))];
        });
      }
    }
  }, [creators, loading, pageNumber]);

  return (
    <PageManager>
      {allCreators.length ? (
        <InfiniteScrollManager
          dataLength={allCreators.length}
          hasMore={!!hasNext}
          onLoadMore={() => setPageNumber((p) => p + 1)}
          loading={loading}
        >
          <div ref={topRef} />
          <Table>
            <TableHeader className="z-30 bg-muted/50 backdrop-blur">
              <TableRow>
                <TableHead className="sticky left-0 z-20 bg-card min-w-20">User</TableHead>
                <TableHead className="text-center min-w-27.5">Assets</TableHead>
                <TableHead className="text-center min-w-27.5">Vaults</TableHead>
                <TableHead className="text-center min-w-27.5">Posts</TableHead>
                <TableHead className="text-center min-w-27.5">Exclusive</TableHead>
                <TableHead className="text-center min-w-27.5">Public</TableHead>
                <TableHead className="text-center min-w-27.5">Subscribers</TableHead>
                <TableHead className="text-center min-w-27.5">Pending</TableHead>
                <TableHead className="text-center min-w-27.5">Processing</TableHead>
                <TableHead className="text-center min-w-27.5">Rejected</TableHead>
                <TableHead className="text-center min-w-27.5">Fulfilled</TableHead>
                <TableHead className="text-center bg-card">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allCreators.map((creator) => (
                <TableRow key={creator.id} className={cn('hover:bg-muted/30 transition-colors')}>
                  <TableCell className="sticky left-0 z-10 bg-card" id="name-cell">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-4 w-4 sm:h-10 sm:w-10">
                        <AvatarImage src={creator.avatarUrl ?? MEOW_FANS_AVATAR} />
                        <AvatarFallback>{creator.username?.[0] || '?'}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="font-semibold truncate">{creator.username}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {creator.firstName} {creator.lastName}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-medium">{creator.creatorProfile.assetCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.vaultCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.totalPost ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.totalExclusivePost ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.totalPublicPost ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.totalSubscriber ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.pendingObjectCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.processingObjectCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.rejectedObjectCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.fulfilledObjectCount ?? 0}</TableCell>
                  <TableCell className="bg-card table-cell">
                    <div className="flex justify-start gap-2">
                      <Link href={`/assets/${creator.username}?p=${pageNumber}`}>
                        <Button size="sm" variant="outline">
                          <GalleryVerticalEnd className="w-2 h-2 sm:mr-1" />
                          <span className="hidden text-xs sm:inline">Assets</span>
                        </Button>
                      </Link>

                      <Link href={`/vaults/${creator.username}`}>
                        <Button size="sm" variant="outline">
                          <Vault className="w-2 h-2 sm:mr-1" />
                          <span className="hidden text-xs sm:inline">Vaults</span>
                        </Button>
                      </Link>

                      <Link href={`/${creator.username}`}>
                        <Button size="sm" variant="outline">
                          <GalleryVertical className="w-2 h-2 sm:mr-1" />
                          <span className="hidden text-xs sm:inline">Posts</span>
                        </Button>
                      </Link>

                      <Button size="sm" variant="outline">
                        <Edit className="w-2 h-2 sm:mr-1" />
                        <span className="hidden text-xs sm:inline">Edit</span>
                      </Button>
                      <ImpersonateCreatorTrigger creator={creator} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScrollManager>
      ) : (
        <div className="flex h-[50vh] items-center justify-center text-muted-foreground">No creators found</div>
      )}
    </PageManager>
  );
};
