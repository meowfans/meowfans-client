'use client';

import { useCreators } from '@/hooks/useCreators';
import { approvalStatusMap } from '@/lib/constants';
import { SortBy } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { AssetsEditOptions } from './AssetsEditOptions';

export const Assets = () => {
  const { creators, hasMore, loading, handlLoadMore } = useCreators({ sortBy: SortBy.AssetCount });

  return (
    <PageManager>
      {creators.length ? (
        <InfiniteScrollManager dataLength={creators.length} hasMore={hasMore} onLoadMore={handlLoadMore} loading={loading}>
          <Table>
            <TableHeader className="z-30 bg-muted/50 backdrop-blur-sm">
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="sticky left-0 top-0 z-40 bg-card min-w-35 sm:min-w-62.5">User</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card whitespace-nowrap min-w-37.5">Status</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card whitespace-nowrap min-w-37.5">Total Assets</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-right hidden md:table-cell">Actions</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-right md:hidden">Actions</TableHead>
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
                  <TableCell className="font-medium text-muted-foreground">
                    <Badge variant="outline" className={approvalStatusMap[creator.creatorProfile.status]}>
                      {creator.creatorProfile.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground">{creator.creatorProfile.assetCount ?? 0} Assets</TableCell>
                  <TableCell className="text-right p-2 sm:p-4">
                    <AssetsEditOptions creator={creator} />
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
