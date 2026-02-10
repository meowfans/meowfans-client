'use client';

import { PageHandler } from '@/components/PageHandler';
import { useTags } from '@/hooks/useTags';
import { useMemo, useState } from 'react';
import { CategoriesGrid } from './CategoriesGrid';
import { CategoriesHeader } from './CategoriesHeader';

export function Categories() {
  const { tags, loading, hasMore, handleLoadMore, isEmpty } = useTags({ limit: 100 });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => tag.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tags, searchQuery]);

  return (
    <PageHandler isLoading={loading} isEmpty={isEmpty}>
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
    </PageHandler>
  );
}
