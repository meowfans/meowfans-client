'use client';

import { useImpersonationStore } from '@/hooks/store/impersonation.store';
import { useCreators } from '@/hooks/useCreators';
import { DataFetchType } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { MoreHorizontal, Users } from 'lucide-react';

export function ProfilesView() {
  const { creators, loading, count, hasMore, handleLoadMore } = useCreators({ take: 50, dataFetchType: DataFetchType.InfiniteScroll });
  const { onOpen } = useImpersonationStore();

  return (
    <div className="space-y-8 p-4 md:p-8 pt-6 max-w-6xl mx-auto flex flex-col h-full w-full min-w-0 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Profiles
          </h1>
          <p className="text-muted-foreground font-medium mt-1 truncate">Manage all registered creator accounts</p>
        </div>
      </div>

      {loading && creators.length === 0 ? (
        <div className="h-full flex items-center justify-center flex-1">
          <Loading />
        </div>
      ) : (
        <InfiniteScrollManager dataLength={creators.length} hasMore={hasMore} onLoadMore={handleLoadMore} loading={loading} useWindowScroll>
          <table className="w-full caption-bottom text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 top-0 z-50 bg-card min-w-[120px] px-3">Creator</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center px-2 min-w-28">Assets</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center px-2 min-w-28">Vaults</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Posts</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Subscribers</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center px-4 min-w-28 bg-card">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creators.map((creator) => (
                <TableRow key={creator.id} className="hover:bg-primary/5 transition-colors group border-b border-primary/5">
                  <TableCell className="py-4 sticky left-0 z-20 bg-card/90 backdrop-blur-md group-hover:bg-primary/10 transition-colors border-r border-primary/5 min-w-[120px] table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-9 w-9 border-2 border-primary/10 group-hover:border-primary/40 transition-colors shrink-0">
                        <AvatarImage src={creator?.avatarUrl ?? MEOW_FANS_AVATAR} />
                        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold uppercase">
                          {creator?.username?.slice(0, 2) || 'C'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5 min-w-0">
                        <p className="font-bold uppercase text-xs truncate">{creator?.username}</p>
                        <p className="text-[9px] text-muted-foreground font-medium truncate uppercase tracking-tighter">
                          ID: {creator.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{creator.creatorProfile.assetCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.vaultCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.totalPost ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.totalSubscriber ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="just">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-primary/20">
                        <DropdownMenuItem className="text-xs uppercase font-black italic">View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs uppercase font-black italic">Suspend User</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs uppercase font-black italic text-destructive">Delete Account</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs uppercase font-black italic" onClick={() => onOpen(creator.id)}>
                          Impersonate User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </InfiniteScrollManager>
      )}
    </div>
  );
}
