'use client';

import { ImportSingleCreatorSheet } from '@/components/ImportSingleCreatorSheet';
import { useImportStore } from '@/hooks/store/import.store';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Ban, CheckCircle2, Clock, Database, Download, Loader2, ShieldCheck, Trash2, XCircle } from 'lucide-react';
import React from 'react';

interface VaultObjectsHeaderProps {
  user: UsersEntity | null;
  selectedCount: number;
  totalFetched: number;
  isProcessing: boolean;
  onBatchDownload: () => void;
  onOpenCleanup: () => void;
  onOpenTerminate: (type: 'downloading' | 'all') => void;
}

export function VaultObjectsHeader({
  user,
  selectedCount,
  totalFetched,
  isProcessing,
  onBatchDownload,
  onOpenCleanup,
  onOpenTerminate
}: VaultObjectsHeaderProps) {
  const counts = user?.creatorProfile;
  const importStatus = useImportStore((s) => s.importStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 md:h-20 md:w-20 border-4 border-primary/10 shrink-0 shadow-lg">
            <AvatarImage src={user?.avatarUrl || ''} alt={user?.username || ''} />
            <AvatarFallback className="text-xl font-black bg-primary/5 text-primary">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center gap-x-3 gap-y-1">
              <h1 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter truncate leading-none">
                {user?.firstName} {user?.lastName}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-bold text-[9px] md:text-[10px] bg-primary/10 text-primary border-primary/20">
                  @{user?.username}
                </Badge>
                {importStatus && (
                  <Badge variant="outline" className="animate-pulse border-blue-500/50 text-blue-600 gap-1 text-[9px] h-5 px-2">
                    <Loader2 className="h-2.5 w-2.5 animate-spin" />
                    {importStatus}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-2 pt-1">
              <p className="text-[10px] md:text-sm text-muted-foreground font-medium flex items-center gap-2">
                <Database className="h-3 w-3 text-primary/40" />
                <span className="truncate opacity-70">meowfans.com/vaults/{user?.id}</span>
              </p>
              <div className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30 hidden md:inline" />
                <p className="text-[9px] md:text-xs text-muted-foreground/60 font-bold uppercase tracking-widest whitespace-nowrap">
                   {user?.lastLoginAt && `Active: ${new Date(user.lastLoginAt).toLocaleDateString()}`}
                </p>
                <Badge variant="outline" className="text-[9px] h-4 md:h-5 px-1.5 opacity-60 font-mono">
                  {totalFetched} Objects
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedCount > 0 && (
            <Button onClick={onBatchDownload} disabled={isProcessing} size="sm" className="gap-2 shadow-sm h-9">
              {isProcessing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">Download Selected</span>
              <span>({selectedCount})</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCleanup}
            className="gap-2 h-9 border-amber-500/50 text-amber-600 hover:bg-amber-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Clean Up</span>
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onOpenTerminate('all')} className="gap-2 h-9">
            <Ban className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Stop Jobs</span>
          </Button>
          <ImportSingleCreatorSheet user={user} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3">
        <StatItem
          label="Pending"
          count={counts?.pendingObjectCount || 0}
          icon={<Clock className="h-3.5 w-3.5 text-amber-500" />}
          className="bg-amber-500/5 border-amber-500/10"
        />
        <StatItem
          label="Processing"
          count={counts?.processingObjectCount || 0}
          icon={<ShieldCheck className="h-3.5 w-3.5 text-blue-500" />}
          className="bg-blue-500/5 border-blue-500/10"
        />
        <StatItem
          label="Fulfilled"
          count={counts?.fulfilledObjectCount || 0}
          icon={<CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
          className="bg-green-500/5 border-green-500/10"
        />
        <StatItem
          label="Rejected"
          count={counts?.rejectedObjectCount || 0}
          icon={<XCircle className="h-3.5 w-3.5 text-destructive" />}
          className="bg-destructive/5 border-destructive/10"
        />
      </div>
    </div>
  );
}

function StatItem({ label, count, icon, className }: { label: string; count: number; icon: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1 md:py-1.5 rounded-full border transition-colors hover:bg-background/50 ${className}`}
    >
      <div className="shrink-0 scale-90 md:scale-100">{icon}</div>
      <div className="flex items-center gap-1.5 md:gap-2">
        <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{label}</span>
        <span className="text-xs md:text-sm font-black font-mono leading-none">{count}</span>
      </div>
    </div>
  );
}
