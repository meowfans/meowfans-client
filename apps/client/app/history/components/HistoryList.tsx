'use client';

import { WatchHistoryEntity } from '@workspace/gql/generated/graphql';
import { AnimatePresence } from 'framer-motion';
import { HistoryEmptyState } from './HistoryEmptyState';
import { HistoryItem } from './HistoryItem';

interface HistoryListProps {
  items: WatchHistoryEntity[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
  searchTerm: string;
}

export function HistoryList({ items, onDelete, isDeleting, searchTerm }: HistoryListProps) {
  if (items.length === 0) return <HistoryEmptyState filtered={!!searchTerm} />;

  return (
    <div className="space-y-2.5">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <HistoryItem key={item.id} item={item} index={index} onDelete={onDelete} isDeleting={isDeleting} />
        ))}
      </AnimatePresence>
    </div>
  );
}
