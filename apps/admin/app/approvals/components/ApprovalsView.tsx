'use client';

import { useImpersonationStore } from '@/hooks/store/impersonation.store';
import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { useCreators } from '@/hooks/useCreators';
import { CreatorApprovalStatus, DataFetchType, UsersEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { CheckCircle2, MoreHorizontal, ShieldCheck, XCircle } from 'lucide-react';

export function ApprovalsView() {
  const { creators, loading, hasMore, handleLoadMore, handleRefetch } = useCreators({
    take: 50,
    dataFetchType: DataFetchType.InfiniteScroll,
    creatorApprovalStatus: CreatorApprovalStatus.Requested
  });
  const { onOpen } = useImpersonationStore();
  const { updateCreatorApprovalStatus, loading: mutationLoading } = useCreatorMutations();

  const handleAction = async (creatorId: string, status: CreatorApprovalStatus) => {
    const res = await updateCreatorApprovalStatus({ creatorId, status });
    if (res) {
      handleRefetch();
    }
  };

  return (
    <div className="flex h-full w-full min-w-0 flex-col p-4 md:p-8 pt-6 overflow-hidden max-w-7xl mx-auto space-y-8">
      <div className="flex w-full flex-col justify-between md:flex-row">
        <div>
          <h1 className="flex items-center gap-3 text-4xl md:text-5xl">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Approvals
          </h1>
          <p className="mt-1 truncate font-medium text-muted-foreground">Review pending creator applications</p>
        </div>
      </div>

      {loading && creators.length === 0 ? (
        <div className="flex flex-1 items-center justify-center h-full">
          <Loading />
        </div>
      ) : (
        <InfiniteScrollManager dataLength={creators.length} hasMore={hasMore} onLoadMore={handleLoadMore} loading={loading} useWindowScroll>
          <table className="w-full caption-bottom text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 top-0 z-50 min-w-[120px] bg-card px-3">Creator</TableHead>
                <TableHead className="sticky top-0 z-30 min-w-28 bg-card px-2 text-center">Assets</TableHead>
                <TableHead className="sticky top-0 z-30 min-w-28 bg-card px-2 text-center">Vaults</TableHead>
                <TableHead className="sticky top-0 z-30 min-w-27.5 bg-card text-center">Posts</TableHead>
                <TableHead className="sticky top-0 z-30 min-w-27.5 bg-card text-center">Subscribers</TableHead>
                <TableHead className="sticky top-0 z-30 min-w-28 bg-card px-4 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creators.map((creator: UsersEntity) => (
                <TableRow key={creator.id} className="group border-b border-primary/5 transition-colors hover:bg-primary/5">
                  <TableCell className="sticky left-0 z-20 min-w-[120px] max-w-[200px] border-r border-primary/5 bg-card/90 py-4 backdrop-blur-md transition-colors group-hover:bg-primary/10 table-cell">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Avatar className="h-9 w-9 shrink-0 border-2 border-primary/10 transition-colors group-hover:border-primary/40">
                        <AvatarImage src={creator?.avatarUrl ?? MEOW_FANS_AVATAR} />
                        <AvatarFallback className="bg-primary/5 text-xs font-bold uppercase text-primary">
                          {creator?.username?.slice(0, 2) || 'C'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 space-y-0.5 overflow-hidden">
                        <p className="truncate text-xs font-bold uppercase">{creator?.username}</p>
                        <p className="truncate text-[9px] font-medium uppercase tracking-tighter text-muted-foreground">
                          ID: {creator.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium table-cell">{creator.creatorProfile?.assetCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile?.vaultCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile?.totalPost ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile?.totalSubscriber ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="just">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 border-primary/20 bg-card/95 backdrop-blur-xl">
                        <DropdownMenuItem className="font-black italic uppercase text-xs" onClick={() => onOpen(creator.id)}>
                          Impersonate User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="font-black italic uppercase text-xs text-green-500 hover:text-green-600 focus:text-green-600"
                          onClick={() => handleAction(creator.id, CreatorApprovalStatus.Accepted)}
                          disabled={mutationLoading}
                        >
                          <CheckCircle2 className="mr-2 h-3 w-3" />
                          Accept application
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="font-black italic uppercase text-xs text-destructive hover:text-destructive focus:text-destructive"
                          onClick={() => handleAction(creator.id, CreatorApprovalStatus.Rejected)}
                          disabled={mutationLoading}
                        >
                          <XCircle className="mr-2 h-3 w-3" />
                          Reject application
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
