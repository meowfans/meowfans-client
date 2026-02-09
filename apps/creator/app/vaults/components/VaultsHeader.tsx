'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { FolderLock, Trash2 } from 'lucide-react';

interface VaultsHeaderProps {
  selectedCount: number;
  onBulkDelete: () => void;
  isBulkDeleting: boolean;
}

export function VaultsHeader({ selectedCount, onBulkDelete, isBulkDeleting }: VaultsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
          <FolderLock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          Vaults Management
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Organize and track your premium collections</p>
      </div>
      {selectedCount > 0 && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex gap-2 w-full sm:w-auto">
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {selectedCount} selected
          </Badge>
          <Button variant="destructive" size="sm" onClick={onBulkDelete} disabled={isBulkDeleting} className="flex-1 sm:flex-none">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
