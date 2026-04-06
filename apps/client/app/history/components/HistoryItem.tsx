'use client';

import { WatchHistoryEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { TYPE_CONFIG, formatDate, formatTime, getHistoryHref } from './history.config';

interface HistoryItemProps {
  item: WatchHistoryEntity;
  index: number;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function HistoryItem({ item, index, onDelete, isDeleting }: HistoryItemProps) {
  const config = TYPE_CONFIG[item.type];
  const Icon = config.icon;
  const href = getHistoryHref(item.type, item.entityId);

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10, height: 0, marginBottom: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.2 }}
      layout
      className="group p-4 rounded-2xl bg-secondary/5 hover:bg-secondary/15 border border-border/20 transition-all flex items-center justify-between gap-4"
    >
      {/* Left: type icon + details */}
      <div className="flex items-center gap-4 min-w-0">
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${config.bg} border border-border/20`}>
          <Icon className={`h-5 w-5 ${config.color}`} />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
              {config.label}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/50 truncate max-w-[120px] md:max-w-[220px]">{item.entityId}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">{formatDate(item.createdAt)}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <span className="text-[10px] text-muted-foreground/40">{formatTime(item.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Right: navigate arrow + delete */}
      <div className="flex items-center gap-1 shrink-0">
        {href && (
          <div className="h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-muted-foreground group-hover:text-primary">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        )}
        <Button
          id={`delete-history-${item.id}`}
          variant="ghost"
          size="icon"
          disabled={isDeleting}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/10 hover:text-destructive"
        >
          {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        </Button>
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
