'use client';

import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Plus } from 'lucide-react';

interface AssetsHeaderProps {
  onUpload: () => void;
  isUploading: boolean;
  selectedCount: number;
  onBulkDelete: () => void;
}

export function AssetsHeader({ onUpload, isUploading, selectedCount, onBulkDelete }: AssetsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
          <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          Assets Library
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage all your uploaded media</p>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        {selectedCount > 0 && (
          <Button variant="destructive" onClick={onBulkDelete} className="flex-1 sm:flex-none">
            Delete ({selectedCount})
          </Button>
        )}

        <div className="relative flex-1 sm:flex-none">
          <Button onClick={onUpload} disabled={isUploading} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Upload New
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
