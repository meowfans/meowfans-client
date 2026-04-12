'use client';

import { ImportSingleCreatorSheet } from '@/components/ImportSingleCreatorSheet';
import { TerminateModal } from '@/components/TerminateModal';
import { useImportStore } from '@/hooks/store/import.store';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clock, Database, Download, Loader2, ShieldCheck, Trash2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Props {
  user: UsersEntity | null;
  selectedCount: number;
  totalFetched: number;
  isProcessing: boolean;
  onBatchDownload: () => void;
  onOpenCleanup: () => void;
}

export default function VaultObjectsHeader({ user, selectedCount, totalFetched, isProcessing, onBatchDownload, onOpenCleanup }: Props) {
  const counts = user?.creatorProfile;
  const importStatus = useImportStore((s) => s.importStatus);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-0">
          <Avatar className="h-16 w-16 border-2 border-primary/10 shadow-xl shadow-black/5 ring-4 ring-background">
            <AvatarImage src={user?.avatarUrl || ''} className="object-cover" />
            <AvatarFallback className="font-black text-lg bg-primary/5 text-primary">{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter truncate leading-none">
                {user?.firstName} {user?.lastName}
              </h1>

              <Badge variant="secondary" className="font-bold text-[10px] uppercase tracking-widest bg-primary/5 border-primary/10">
                @{user?.username}
              </Badge>

              {importStatus && (
                <Badge
                  variant="outline"
                  className="animate-pulse border-blue-500/30 text-blue-600 gap-1.5 text-[10px] font-black uppercase tracking-widest"
                >
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {importStatus}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
              <div className="flex items-center gap-1.5">
                <Database className="h-3 w-3 opacity-40" />
                <span className="truncate max-w-[120px] md:max-w-none">/vaults/{user?.id?.slice(0, 8)}...</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-muted-foreground/20" />
                <span>{totalFetched} Objects Loaded</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-full lg:w-auto">
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            <TerminateModal />

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCleanup}
              className="font-black uppercase tracking-tighter text-[10px] h-9 border-amber-500/30 text-amber-600 hover:bg-amber-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clean Up
            </Button>
          </div>

          <ImportSingleCreatorSheet user={user} />
          {selectedCount > 0 && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full sm:w-auto">
              <Button
                onClick={onBatchDownload}
                disabled={isProcessing}
                size="sm"
                className="w-full sm:w-auto gap-2 h-9 bg-primary font-black uppercase tracking-tighter text-[10px] px-6 shadow-lg shadow-primary/20"
              >
                {isProcessing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                Download ({selectedCount})
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatItem
          label="Pending"
          count={counts?.pendingObjectCount || 0}
          icon={<Clock className="h-4 w-4 text-amber-500" />}
          className="bg-amber-500/5 border-amber-500/10"
        />
        <StatItem
          label="Processing"
          count={counts?.processingObjectCount || 0}
          icon={<ShieldCheck className="h-4 w-4 text-blue-500" />}
          className="bg-blue-500/5 border-blue-500/10"
        />
        <StatItem
          label="Fulfilled"
          count={counts?.fulfilledObjectCount || 0}
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
          className="bg-green-500/5 border-green-500/10"
        />
        <StatItem
          label="Rejected"
          count={counts?.rejectedObjectCount || 0}
          icon={<XCircle className="h-4 w-4 text-red-500" />}
          className="bg-destructive/5 border-destructive/10"
        />
      </div>
    </div>
  );
}

function StatItem({ label, count, icon, className }: { label: string; count: number; icon: React.ReactNode; className?: string }) {
  const [prev, setPrev] = useState(count);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (count > prev) {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }
    setPrev(count);
  }, [count, prev]);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all ${className}`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tight">{label}</span>
        <div className="flex items-center gap-2">
          {icon}
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-xl font-black tabular-nums tracking-tighter"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {pulse && (
        <motion.div
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.2 }}
          className="absolute inset-0 bg-primary/10 rounded-2xl pointer-events-none"
        />
      )}
    </motion.div>
  );
}
