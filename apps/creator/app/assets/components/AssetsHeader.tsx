'use client';

import { Button } from '@workspace/ui/components/button';
import { pluralizeByCount } from '@workspace/ui/lib/helpers';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface AssetsHeaderProps {
  onUpload: () => void;
  isUploading: boolean;
  selectedCount: number;
  onBulkDelete: () => void;
  onClearSelection?: () => void;
}

export function AssetsHeader({ onUpload, isUploading, selectedCount, onBulkDelete, onClearSelection }: AssetsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between gap-4 px-4 py-6"
    >
      <div className="flex flex-col">
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">Library</h1>
        {selectedCount > 0 ? (
          <p className="text-sm font-medium text-primary animate-in fade-in slide-in-from-left-1">
            {selectedCount} {pluralizeByCount(selectedCount, 'item')} selected
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Manage your media</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {selectedCount > 0 ? (
          <>
            <Button variant="outline" size="sm" onClick={onClearSelection} className="h-9 px-3 rounded-full border-border/60">
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onBulkDelete}
              className="h-9 px-4 rounded-full shadow-lg shadow-destructive/20"
            >
              Delete
            </Button>
          </>
        ) : (
          <Button
            onClick={onUpload}
            disabled={isUploading}
            size="sm"
            className="h-10 px-5 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4 stroke-[3px]" />
            Upload
          </Button>
        )}
      </div>
    </motion.div>
  );
}
