'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface HistoryEmptyStateProps {
  filtered: boolean;
}

export function HistoryEmptyState({ filtered }: HistoryEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center gap-4"
    >
      <div className="h-16 w-16 rounded-3xl bg-secondary/20 border border-border/30 flex items-center justify-center">
        <Clock className="h-7 w-7 text-muted-foreground/40" />
      </div>
      <div>
        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">
          {filtered ? 'No results found' : 'No history yet'}
        </p>
        <p className="text-[11px] text-muted-foreground/40 mt-1">
          {filtered ? 'Try a different search or filter' : 'Start exploring content to build your history'}
        </p>
      </div>
    </motion.div>
  );
}
