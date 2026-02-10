'use client';

import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { RefreshCcw, Sparkles } from 'lucide-react';

interface ShortsEmptyStateProps {
  onRefresh: () => void;
}

export function ShortsEmptyState({ onRefresh }: ShortsEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6"
    >
      <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center border border-border">
        <Sparkles className="h-10 w-10 text-muted-foreground/40" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">End of the line</h2>
        <p className="text-sm text-muted-foreground max-w-[200px]">You&apos;ve seen all the shorts we have for now. Check back later!</p>
      </div>
      <Button onClick={onRefresh} variant="outline" className="rounded-full gap-2 transition-all">
        <RefreshCcw className="h-4 w-4" />
        Refresh Feed
      </Button>
    </motion.div>
  );
}
