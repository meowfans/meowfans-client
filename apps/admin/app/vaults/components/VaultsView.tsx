'use client';

import { BatchDownloadModal } from '@/components/BatchDownloadModal';
import { CleanUpModal } from '@/components/CleanUpModal';
import { TerminateModal } from '@/components/TerminateModal';
import { useImpersonationStore } from '@/hooks/store/impersonation.store';
import { useCreators } from '@/hooks/useCreators';
import { useGetAllObjectsCount } from '@/hooks/useVaults';
import { DataFetchType } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { AlertCircle, Ban, CheckCircle2, Clock, Download, Lock, MoreHorizontal, ShieldCheck, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function VaultsView() {
  const router = useRouter();
  const {
    creators,
    loading: creatorsLoading,
    hasMore,
    handleLoadMore
  } = useCreators({ take: 50, dataFetchType: DataFetchType.InfiniteScroll });
  const { objectsCount, fetchCounts } = useGetAllObjectsCount();
  const { onOpen } = useImpersonationStore();
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [terminateModalType, setTerminateModalType] = useState<'downloading' | 'all' | null>(null);
  const [cleanupModalData, setCleanupModalData] = useState<{ id: string; username: string } | null>(null);

  useEffect(() => {
    fetchCounts();
  }, []); // eslint-disable-line

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCreators(creators.map((c) => c.id));
    } else {
      setSelectedCreators([]);
    }
  };

  const handleSelectCreator = (creatorId: string, checked: boolean) => {
    if (checked) {
      setSelectedCreators((prev) => [...prev, creatorId]);
    } else {
      setSelectedCreators((prev) => prev.filter((id) => id !== creatorId));
    }
  };

  const isAllSelected = creators.length > 0 && selectedCreators.length === creators.length;
  const isIndeterminate = selectedCreators.length > 0 && selectedCreators.length < creators.length;

  return (
    <div className="space-y-8 p-4 md:p-8 pt-6 max-w-6xl mx-auto flex flex-col h-full w-full min-w-0 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full justify-between shrink-0 items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl flex items-center gap-3">
            <Lock className="h-8 w-8 text-primary" />
            Vaults
          </h1>
          <p className="text-muted-foreground font-medium mt-1 truncate">Manage and review secure content vault</p>
        </div>
        {selectedCreators.length > 0 && (
          <Button onClick={() => setIsBatchModalOpen(true)} className="gap-2">
            <Download className="h-4 w-4" />
            Start Batch Download
          </Button>
        )}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="text-destructive hover:bg-destructive/10 gap-2"
            onClick={() => setTerminateModalType('downloading')}
          >
            <AlertCircle className="h-4 w-4" />
            Stop Downloads
          </Button>
          <Button variant="destructive" className="gap-2" onClick={() => setTerminateModalType('all')}>
            <Ban className="h-4 w-4" />
            Stop All Jobs
          </Button>
        </div>
      </div>

      <BatchDownloadModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        selectedCreators={selectedCreators}
        onSuccess={() => setSelectedCreators([])}
      />

      {terminateModalType && (
        <TerminateModal isOpen={!!terminateModalType} onClose={() => setTerminateModalType(null)} type={terminateModalType} />
      )}

      {cleanupModalData && (
        <CleanUpModal
          isOpen={!!cleanupModalData}
          onClose={() => setCleanupModalData(null)}
          creatorId={cleanupModalData.id}
          creatorUsername={cleanupModalData.username}
        />
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
        <CountCard
          title="Pending"
          count={objectsCount.pending}
          icon={<Clock className="h-4 w-4" />}
          color="text-amber-500"
          bgColor="bg-amber-500/10"
        />
        <CountCard
          title="Processing"
          count={objectsCount.processing}
          icon={<ShieldCheck className="h-4 w-4" />}
          color="text-blue-500"
          bgColor="bg-blue-500/10"
        />
        <CountCard
          title="Fulfilled"
          count={objectsCount.fulfilled}
          icon={<CheckCircle2 className="h-4 w-4" />}
          color="text-green-500"
          bgColor="bg-green-500/10"
        />
        <CountCard
          title="Rejected"
          count={objectsCount.rejected}
          icon={<XCircle className="h-4 w-4" />}
          color="text-destructive"
          bgColor="bg-destructive/10"
        />
      </div>

      {creatorsLoading && creators.length === 0 ? (
        <div className="h-full flex items-center justify-center flex-1">
          <Loading />
        </div>
      ) : (
        <InfiniteScrollManager
          dataLength={creators.length}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          loading={creatorsLoading}
          useWindowScroll
        >
          <table className="w-full caption-bottom text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 top-0 z-50 bg-card w-[50px] px-3">
                  <Checkbox
                    checked={isAllSelected || (isIndeterminate ? 'indeterminate' : false)}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="sticky left-[50px] top-0 z-50 bg-card min-w-[120px] px-3">Creator</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center px-2 min-w-28">Pending</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center px-2 min-w-28">Processing</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Rejected</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center min-w-27.5">Fulfilled</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-center px-4 min-w-28 bg-card">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creators.map((creator) => (
                <TableRow
                  key={creator.id}
                  className="hover:bg-primary/5 transition-colors group border-b border-primary/5"
                  data-state={selectedCreators.includes(creator.id) && 'selected'}
                >
                  <TableCell className="py-4 sticky left-0 z-20 bg-card/90 backdrop-blur-md border-r border-primary/5 w-[50px] table-cell">
                    <Checkbox
                      checked={selectedCreators.includes(creator.id)}
                      onCheckedChange={(checked) => handleSelectCreator(creator.id, checked as boolean)}
                      aria-label="Select row"
                    />
                  </TableCell>
                  <TableCell className="py-4 sticky left-[50px] z-20 bg-card/90 backdrop-blur-md group-hover:bg-primary/10 transition-colors border-r border-primary/5 min-w-[120px] table-cell">
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
                  <TableCell className="text-center font-medium">{creator.creatorProfile.pendingObjectCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.processingObjectCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.rejectedObjectCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{creator.creatorProfile.fulfilledObjectCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="just">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-primary/20">
                        <DropdownMenuItem
                          className="text-xs uppercase font-black italic"
                          onClick={() => router.push(`/vaults/${encodeURIComponent(creator.id)}`)}
                        >
                          View Vault
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs uppercase font-black italic">Manage Request</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs uppercase font-black italic" onClick={() => onOpen(creator.id)}>
                          Impersonate User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-xs uppercase font-black italic text-amber-500 focus:text-amber-500"
                          onClick={() => setCleanupModalData({ id: creator.id, username: creator.username })}
                        >
                          Clean Up Vault
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

function CountCard({
  title,
  count,
  icon,
  color,
  bgColor
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}) {
  return (
    <Card className="bg-card/20 backdrop-blur-xl border-primary/5 p-1 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{title}</p>
          <div className={`${bgColor} ${color} p-2 rounded-lg`}>{icon}</div>
        </div>
        <p className="text-3xl tracking-tighter">{count}</p>
      </CardContent>
    </Card>
  );
}
