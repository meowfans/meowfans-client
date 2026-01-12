'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { motion } from 'framer-motion';
import { AlertTriangle, FileX2, Trash2 } from 'lucide-react';

interface Props {
  setDeleteAllAssetsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAllAssets: React.FC<Props> = ({ setDeleteAllAssetsModal }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
      <Card className="border-orange-200 dark:border-orange-900/30 bg-orange-50/50 dark:bg-orange-950/10 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-linear-to-br from-orange-500/10 to-orange-600/10">
              <FileX2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1 space-y-1">
              <CardTitle className="text-xl text-orange-600 dark:text-orange-400">Delete All Assets</CardTitle>
              <CardDescription className="text-orange-600/70 dark:text-orange-400/70">
                Permanently remove all your uploaded content
              </CardDescription>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg border border-orange-200 dark:border-orange-900/30 bg-orange-100/50 dark:bg-orange-950/20">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-orange-900 dark:text-orange-300">Warning: This action is irreversible</p>
              <p className="text-xs text-orange-700 dark:text-orange-400">
                This will permanently delete all your photos, videos, and media files. Your subscribers will lose access to this content
                immediately.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Clear All Content</h4>
              <p className="text-xs text-muted-foreground">Remove all assets while keeping your account active</p>
            </div>
            <TriggerModal
              onChangeModalState={() => setDeleteAllAssetsModal(true)}
              className={cn(
                'bg-linear-to-r from-orange-600 to-orange-700',
                'hover:from-orange-700 hover:to-orange-800',
                'shadow-lg shadow-orange-600/20',
                'transition-all duration-200'
              )}
              modalIcon={{ icon: Trash2, size: 'default' }}
              modalText="Delete All Assets"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DeleteAllAssets;
