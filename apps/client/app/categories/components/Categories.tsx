'use client';

import { useServerTags } from '@/hooks/server/useServerTags';
import { TagsEntity } from '@workspace/gql/generated/graphql';
import { useMemo, useState } from 'react';
import { CategoriesGrid } from './CategoriesGrid';
import { CategoriesHeader } from './CategoriesHeader';

interface CategoriesProps {
  initialTags: TagsEntity[];
}

export function Categories({ initialTags }: CategoriesProps) {
  const { tags, loading, hasMore, loadMore } = useServerTags({ limit: 100 }, initialTags);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => tag.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tags, searchQuery]);

  return (
    <div className="gap-6 p-6">
      <CategoriesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} tags={tags} filteredTags={filteredTags} />
      <CategoriesGrid
        filteredTags={filteredTags}
        loading={loading}
        hasMore={hasMore}
        handleLoadMore={loadMore}
        searchQuery={searchQuery}
        initialTags={initialTags}
      />
    </div>
  );
}
