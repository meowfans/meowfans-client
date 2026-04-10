'use client';

import { ImportCreatorsSheet } from '@/components/ImportCreatorsSheet';
import { useImportStore } from '@/hooks/store/import.store';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { AlertCircle, Ban, Download, Loader2, Lock } from 'lucide-react';

interface VaultsHeaderProps {
  selectedCount: number;
  onStartBatchDownload: () => void;
  onOpenTerminate: (type: 'downloading' | 'all') => void;
}

export function VaultsHeader({ selectedCount, onStartBatchDownload, onOpenTerminate }: VaultsHeaderProps) {
  const importStatus = useImportStore((s) => s.importStatus);

  return (
    <div className="flex flex-col md:flex-row w-full justify-between shrink-0 items-start md:items-center gap-6">
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 tracking-tight">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Lock className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          Vaults
        </h1>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            Manage and review secure content vault
            <Badge variant="outline" className="text-[10px] uppercase h-5 font-mono">
              Admin
            </Badge>
          </p>
          {importStatus && (
            <div className="flex items-center gap-2 text-[11px] font-bold text-blue-500 animate-pulse">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="uppercase tracking-wider">{importStatus}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        {selectedCount > 0 && (
          <Button onClick={onStartBatchDownload} className="gap-2 h-9 text-xs md:text-sm shadow-lg shadow-primary/20 flex-1 md:flex-none">
            <Download className="h-4 w-4" />
            Batch Download ({selectedCount})
          </Button>
        )}
        <div className="flex gap-2 w-full md:w-auto">
          <ImportCreatorsSheet />
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-destructive/20 text-destructive hover:bg-destructive/5 gap-2 flex-1 md:flex-none text-xs"
            onClick={() => onOpenTerminate('downloading')}
          >
            <AlertCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Stop Downloads</span>
            <span className="sm:hidden">Stop</span>
          </Button>
          <Button variant="destructive" size="sm" className="h-9 gap-2 flex-1 md:flex-none text-xs" onClick={() => onOpenTerminate('all')}>
            <Ban className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Stop All Jobs</span>
            <span className="sm:hidden">Reset</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
