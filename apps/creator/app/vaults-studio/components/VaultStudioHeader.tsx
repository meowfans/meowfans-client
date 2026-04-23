import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { FolderLock } from 'lucide-react';
import Link from 'next/link';

interface VaultStudioHeaderProps {
  selectedAssetsLength: number;
}

export const VaultStudioHeader = ({ selectedAssetsLength }: VaultStudioHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
          <FolderLock className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
          <span className="truncate">Vaults Studio</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Create exclusive collections and maximize your earnings</p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Button variant="outline" size="sm" className="text-xs sm:text-sm" asChild>
          <Link href="/vaults">Manage Vaults</Link>
        </Button>
        <Badge variant="secondary" className="text-xs sm:text-sm whitespace-nowrap">
          {selectedAssetsLength} selected
        </Badge>
      </div>
    </motion.div>
  );
};
