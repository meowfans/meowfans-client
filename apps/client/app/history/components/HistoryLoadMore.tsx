'use client';

import { Button } from '@workspace/ui/components/button';
import { Loader2 } from 'lucide-react';

interface HistoryLoadMoreProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export function HistoryLoadMore({ hasMore, loading, onLoadMore }: HistoryLoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center pt-4">
      <Button
        id="history-load-more"
        variant="outline"
        size="sm"
        disabled={loading}
        onClick={onLoadMore}
        className="rounded-full px-6 h-9 text-[10px] font-black uppercase tracking-widest border-border/50 hover:bg-secondary/30"
      >
        {loading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          'Load More'
        )}
      </Button>
    </div>
  );
}
