'use client';

import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { Clock, ShieldCheck, XCircle, CheckCircle2, MoreHorizontal, ExternalLink, ShieldAlert, UserCheck, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface VaultsTableProps {
  creators: UsersEntity[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  selectedCreators: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectCreator: (id: string, checked: boolean) => void;
  onOpenCleanup: (id: string, username: string) => void;
  onImpersonate: (id: string) => void;
}

export function VaultsTable({
  creators,
  loading,
  hasMore,
  onLoadMore,
  selectedCreators,
  onSelectAll,
  onSelectCreator,
  onOpenCleanup,
  onImpersonate
}: VaultsTableProps) {
  const router = useRouter();
  const isAllSelected = creators.length > 0 && selectedCreators.length === creators.length;
  const isIndeterminate = selectedCreators.length > 0 && selectedCreators.length < creators.length;

  return (
    <div className="flex-1 min-h-0 relative border rounded-xl bg-card overflow-hidden shadow-sm">
      {loading && creators.length === 0 ? (
        <div className="h-full flex items-center justify-center p-12">
          <Loading />
        </div>
      ) : (
        <InfiniteScrollManager
          dataLength={creators.length}
          hasMore={hasMore}
          onLoadMore={onLoadMore}
          loading={loading}
          useWindowScroll
        >
          <div className="overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <TableHeader className="sticky top-0 bg-card z-10 shadow-sm border-b">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 px-4">
                    <Checkbox
                      checked={isAllSelected || (isIndeterminate ? 'indeterminate' : false)}
                      onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="min-w-[180px] px-4 py-4 font-semibold">Creator</TableHead>
                  <TableHead className="text-center px-2 py-4 font-semibold hidden sm:table-cell">Pending</TableHead>
                  <TableHead className="text-center px-2 py-4 font-semibold hidden md:table-cell">Processing</TableHead>
                  <TableHead className="text-center px-2 py-4 font-semibold hidden lg:table-cell">Rejected</TableHead>
                  <TableHead className="text-center px-2 py-4 font-semibold hidden sm:table-cell">Fulfilled</TableHead>
                  <TableHead className="text-right px-4 py-4 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creators.map((creator) => (
                  <TableRow
                    key={creator.id}
                    className="hover:bg-muted/30 transition-colors border-b last:border-0 group"
                    data-state={selectedCreators.includes(creator.id) && 'selected'}
                  >
                    <TableCell className="px-4 py-3">
                      <Checkbox
                        checked={selectedCreators.includes(creator.id)}
                        onCheckedChange={(checked) => onSelectCreator(creator.id, checked as boolean)}
                        aria-label="Select row"
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/5 group-hover:border-primary/20 transition-all shadow-sm">
                          <AvatarImage src={creator?.avatarUrl ?? MEOW_FANS_AVATAR} />
                          <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold uppercase">
                            {creator?.username?.slice(0, 2) || 'C'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5 min-w-0">
                          <p className="font-bold text-sm truncate tracking-tight">{creator?.username}</p>
                          <p className="text-[10px] text-muted-foreground font-mono truncate opacity-60">
                            {creator.id.slice(0, 12)}...
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center px-2 py-3 hidden sm:table-cell">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-bold text-amber-600/80">{creator.creatorProfile.pendingObjectCount ?? 0}</span>
                        <Clock className="h-3 w-3 text-amber-500/40" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center px-2 py-3 hidden md:table-cell">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-bold text-blue-600/80">{creator.creatorProfile.processingObjectCount ?? 0}</span>
                        <ShieldCheck className="h-3 w-3 text-blue-500/40" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center px-2 py-3 hidden lg:table-cell">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-bold text-destructive/80">{creator.creatorProfile.rejectedObjectCount ?? 0}</span>
                        <XCircle className="h-3 w-3 text-destructive/40" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center px-2 py-3 hidden sm:table-cell">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-bold text-green-600/80">{creator.creatorProfile.fulfilledObjectCount ?? 0}</span>
                        <CheckCircle2 className="h-3 w-3 text-green-500/40" />
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-xl border-primary/10">
                          <DropdownMenuItem
                            className="text-xs font-bold uppercase tracking-wider gap-2 h-9 cursor-pointer"
                            onClick={() => router.push(`/vaults/${encodeURIComponent(creator.id)}?tab=objects`)}
                          >
                            <ExternalLink className="h-3.5 w-3.5 text-primary" />
                            View Vault Objects
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-xs font-bold uppercase tracking-wider gap-2 h-9 cursor-pointer"
                            onClick={() => onImpersonate(creator.id)}
                          >
                            <UserCheck className="h-3.5 w-3.5 text-blue-500" />
                            Impersonate User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-xs font-bold uppercase tracking-wider gap-2 h-9 cursor-pointer text-amber-600 focus:text-amber-700 focus:bg-amber-50"
                            onClick={() => onOpenCleanup(creator.id, creator.username)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Clean Up Vault
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-bold uppercase tracking-wider gap-2 h-9 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5 line-through decoration-1 opacity-50">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            Manage Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {creators.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center text-muted-foreground italic">
                      No creators found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </table>
          </div>
        </InfiniteScrollManager>
      )}
    </div>
  );
}
