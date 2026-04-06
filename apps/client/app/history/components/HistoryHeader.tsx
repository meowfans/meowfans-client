'use client';

import { Input } from '@workspace/ui/components/input';
import { History as HistoryIcon, Search, X } from 'lucide-react';

interface HistoryHeaderProps {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  totalCount: number;
  onClearSearch: () => void;
}

export function HistoryHeader({ searchTerm, onSearchChange, totalCount, onClearSearch }: HistoryHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <HistoryIcon className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic">Watch History</h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em]">
          {totalCount > 0 ? `${totalCount} items in your history` : 'Your recently viewed content'}
        </p>
      </div>

      <div className="relative group max-w-xs w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          id="history-search"
          placeholder="Search by ID or type..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9 h-11 w-full rounded-2xl border-border/50 bg-secondary/20 focus-visible:ring-primary/20"
        />
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
