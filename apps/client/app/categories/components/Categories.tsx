'use client';

import { useTags } from '@/hooks/useTags';
import { Loading } from '@workspace/ui/globals/Loading';
import { useMemo, useState } from 'react';
import { CategoriesGrid } from './CategoriesGrid';
import { CategoriesHeader } from './CategoriesHeader';

export function Categories() {
  const { tags, loading, hasMore, handleLoadMore, isEmpty } = useTags({ limit: 100 });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => tag.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tags, searchQuery]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scanning Categories</p>
      </div>
    );
  }

  if (!tags.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Categories Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <CategoriesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} tags={tags} filteredTags={filteredTags} />
      <CategoriesGrid
        filteredTags={filteredTags}
        loading={loading}
        hasMore={hasMore}
        handleLoadMore={handleLoadMore}
        searchQuery={searchQuery}
      />
    </div>
  );
}
