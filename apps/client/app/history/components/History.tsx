'use client';

import { useHistoryMutations } from '@/hooks/client/useHistory';
import { useServerHistory } from '@/hooks/server/useServerHistory';
import { WatchHistoryEntity, WatchHistoryType } from '@workspace/gql/generated/graphql';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { useMemo, useState } from 'react';
import { HISTORY_TABS, TabValue } from './history.config';
import { HistoryHeader } from './HistoryHeader';
import { HistoryList } from './HistoryList';
import { HistoryLoadMore } from './HistoryLoadMore';
import { HistoryStats } from './HistoryStats';

interface HistoryProps {
  initialHistory: WatchHistoryEntity[];
}

export function History({ initialHistory }: HistoryProps) {
  const { history, loading, loadMore, hasMore } = useServerHistory({ take: 30 }, initialHistory);
  const { deleteWatchHistory, loading: isDeleting } = useHistoryMutations();

  console.log(history)

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('all');

  const filtered = useMemo(() => {
    let result = [...history];
    if (activeTab !== 'all') result = result.filter((h) => h.type === (activeTab as WatchHistoryType));
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((h) => h.entityId.toLowerCase().includes(lower) || h.type.toLowerCase().includes(lower));
    }
    return result;
  }, [history, activeTab, searchTerm]);

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8 pt-0 max-w-4xl mx-auto w-full">
      <HistoryHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCount={history.length}
        onClearSearch={() => setSearchTerm('')}
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)} className="w-full">
        <TabsList className="bg-transparent border-b border-border/50 rounded-none w-full justify-start h-auto p-0 mb-6 flex-wrap gap-0">
          {HISTORY_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 uppercase text-[10px] font-black tracking-widest transition-all"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {HISTORY_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0">
            <HistoryList items={filtered} onDelete={deleteWatchHistory} isDeleting={isDeleting} searchTerm={searchTerm} />
          </TabsContent>
        ))}
      </Tabs>

      <HistoryLoadMore hasMore={hasMore} loading={loading} onLoadMore={loadMore} />

      {history.length > 0 && (
        <div className="pt-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">Content Breakdown</p>
          <HistoryStats history={history} />
        </div>
      )}
    </div>
  );
}
