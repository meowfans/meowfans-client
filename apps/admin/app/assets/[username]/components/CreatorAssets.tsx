'use client';

import { useAssets } from '@/hooks/useAssets';
import { SortingState } from '@tanstack/react-table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { CreatorAssetsHeader } from './CreatorAssetsHeader';
import { CreatorAssetsTable } from './CreatorAssetsTable';

export const CreatorAssets = () => {
  const { username } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const { assets, hasMore, loading, onLoadMore } = useAssets({ take: 30 });

  const user = Array.isArray(username) ? username[0] : username;


  return (
    <PageManager>
      <div className="flex flex-col gap-4 p-4 md:p-8 min-h-screen">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Assets for {user}</h1>
          <p className="text-muted-foreground">Manage private and public assets for this creator.</p>
        </div>

        <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
          <InfiniteScrollManager dataLength={assets.length} hasMore={hasMore} loading={loading} onLoadMore={onLoadMore}>
            <div className="p-4 border-b">
              <CreatorAssetsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <CreatorAssetsTable assets={assets} sorting={sorting} setSorting={setSorting} />
          </InfiniteScrollManager>
        </div>
      </div>
    </PageManager>
  );
};
