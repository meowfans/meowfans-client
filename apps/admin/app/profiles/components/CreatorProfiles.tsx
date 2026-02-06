'use client';

import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { cn } from '@workspace/ui/lib/utils';
import { CreatorProfilesEditOptions } from './CreatorProfilesEditOptions';

export const CreatorProfiles = () => {
  const { creators, loading, handlLoadMore, hasMore } = useCreators({ sortBy: SortBy.AssetCount, orderBy: SortOrder.Desc });

  return (
    <PageManager>
      {creators.length ? (
        <InfiniteScrollManager hasMore={hasMore} loading={loading} onLoadMore={handlLoadMore} dataLength={creators.length}>
          <Table>
            <TableHeader className="z-30 bg-muted/50 backdrop-blur">
              <TableRow>
                <TableHead className="sticky left-0 top-0 z-40 bg-card min-w-20">User</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Assets</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Vaults</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Posts</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Exclusive</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Public</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Subscribers</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Pending</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Processing</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Rejected</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Fulfilled</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creators.map((creator) => (
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
                    <CreatorProfilesEditOptions creator={creator} />
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
