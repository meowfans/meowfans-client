'use client';

import { ImportSingleCreatorSheet } from '@/components/ImportSingleCreatorSheet';
import { useImportStore } from '@/hooks/store/import.store';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Ban, CheckCircle2, Clock, Database, Download, Loader2, ShieldCheck, Trash2, XCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

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
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-primary/10 shrink-0 shadow-sm">
            <AvatarImage src={user?.avatarUrl || ''} alt={user?.username || ''} />
            <AvatarFallback className="text-sm font-black bg-primary/5 text-primary">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-black italic uppercase tracking-tighter truncate leading-none">
                {user?.firstName} {user?.lastName}
              </h1>
              <Badge variant="secondary" className="hidden sm:flex font-bold text-[8px] bg-primary/5 text-primary/60 border-primary/10 px-1.5 h-4">
                @{user?.username}
              </Badge>
              {importStatus && (
                <Badge variant="outline" className="animate-pulse border-blue-500/30 text-blue-600 gap-1 text-[8px] h-4 px-1.5">
                  <Loader2 className="h-2 w-2 animate-spin" />
                  {importStatus}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3 pt-0.5">
              <p className="text-[9px] md:text-xs text-muted-foreground/60 font-medium flex items-center gap-1.5">
                <Database className="h-2.5 w-2.5 opacity-40" />
                <span className="truncate max-w-[150px] md:max-w-none">.../vaults/{user?.id}</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-muted-foreground/20" />
                <Badge variant="outline" className="text-[8px] h-4 px-1 opacity-50 font-mono border-none bg-muted/50">
                  {totalFetched} Objects
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto shrink-0">
          {selectedCount > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full sm:w-auto"
            >
              <Button
                onClick={onBatchDownload}
                disabled={isProcessing}
                size="sm"
                className="w-full gap-2 h-8 md:h-9 bg-primary font-black italic uppercase tracking-tighter text-[10px] px-3"
              >
                {isProcessing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                <span>Download ({selectedCount})</span>
              </Button>
            </motion.div>
          )}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCleanup}
              className="flex-1 sm:flex-none gap-1.5 h-8 md:h-9 border-amber-500/30 text-amber-600 hover:bg-amber-50 font-black italic uppercase tracking-tighter text-[10px] px-3"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clean Up</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onOpenTerminate('all')}
              className="flex-1 sm:flex-none gap-1.5 h-8 md:h-9 font-black italic uppercase tracking-tighter text-[10px] px-3"
            >
              <Ban className="h-3 w-3" />
              <span>Stop</span>
            </Button>
          </div>
          <div className="w-full sm:w-auto">
            <ImportSingleCreatorSheet user={user} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 md:gap-2">
        <StatItem
          label="Pending"
          count={counts?.pendingObjectCount || 0}
          icon={<Clock className="h-3 w-3 text-amber-500" />}
          className="bg-amber-500/5 border-amber-500/10"
        />
        <StatItem
          label="Processing"
          count={counts?.processingObjectCount || 0}
          icon={<ShieldCheck className="h-3 w-3 text-blue-500" />}
          className="bg-blue-500/5 border-blue-500/10"
        />
        <StatItem
          label="Fulfilled"
          count={counts?.fulfilledObjectCount || 0}
          icon={<CheckCircle2 className="h-3 w-3 text-green-500" />}
          className="bg-green-500/5 border-green-500/10"
        />
        <StatItem
          label="Rejected"
          count={counts?.rejectedObjectCount || 0}
          icon={<XCircle className="h-3 w-3 text-destructive" />}
          className="bg-destructive/5 border-destructive/10"
        />
      </div>
    </div>
  );
}

function StatItem({ label, count, icon, className }: { label: string; count: number; icon: React.ReactNode; className?: string }) {
  const [prevCount, setPrevCount] = useState<number>(count);
  const [isIncreased, setIsIncreased] = useState<boolean>(false);

  useEffect(() => {
    if (count > prevCount) {
      setIsIncreased(true);
      const timer = setTimeout(() => setIsIncreased(false), 1000);
      setPrevCount(count);
      return () => clearTimeout(timer);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`flex items-center gap-2 px-2.5 py-1 rounded-lg md:rounded-full border transition-all hover:bg-background/50 group relative overflow-hidden ${className}`}
    >
      {isIncreased && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1.2 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-primary pointer-events-none"
        />
      )}
      <div className="shrink-0 scale-90 group-hover:scale-100 transition-transform duration-300">{icon}</div>
      <div className="flex items-center gap-1.5">
        <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest leading-none">{label}</span>
        <div className="flex items-center gap-1 min-w-[20px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="text-[10px] md:text-xs font-black font-mono leading-none tracking-tighter"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
