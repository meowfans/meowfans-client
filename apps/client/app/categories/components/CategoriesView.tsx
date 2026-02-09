'use client';

import { useTags } from '@/hooks/useTags';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { Hash, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function CategoriesView() {
  const { tags, loading, hasMore, handleLoadMore } = useTags({ limit: 100 });
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tags based on search query
  const filteredTags = tags.filter((tag) => tag.label.toLowerCase().includes(searchQuery.toLowerCase()));

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
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Explore content by popular tags and categories</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Stats */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>
              {filteredTags.length} {filteredTags.length === 1 ? 'category' : 'categories'} available
            </span>
          </div>
        )}
      </div>

      {/* Categories Grid */}
      {filteredTags.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
          <div className="text-center">
            <Hash className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">{searchQuery ? 'No categories found' : 'No categories available'}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery ? 'Try a different search term' : 'Check back later for new categories'}
            </p>
          </div>
        </div>
      ) : (
        <InfiniteScrollManager
          dataLength={filteredTags.length}
          loading={loading}
          hasMore={hasMore && !searchQuery}
          onLoadMore={handleLoadMore}
          useWindowScroll
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredTags.map((tag, index) => {
              // Create unique key combining id and index to prevent duplicates
              const uniqueKey = `tag-${tag.id}-${index}`;

              return (
                <Link key={uniqueKey} href={`/categories/${encodeURIComponent(tag.label)}`}>
                  <Card className="group overflow-hidden border-none bg-secondary/20 shadow-none transition-all hover:bg-secondary/40 hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="flex aspect-square flex-col items-center justify-center p-6 text-center">
                      {/* Icon with gradient background */}
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 transition-transform group-hover:scale-110">
                        <Hash className="h-6 w-6 text-primary" />
                      </div>

                      {/* Tag Label */}
                      <h3 className="line-clamp-2 text-sm font-semibold tracking-tight">{tag.label}</h3>

                      {/* Trending Badge for first few items */}
                      {index < 6 && (
                        <Badge variant="secondary" className="mt-2 gap-1 text-[10px]">
                          <TrendingUp className="h-2.5 w-2.5" />
                          Trending
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {loading && !searchQuery && <Loading />}
        </InfiniteScrollManager>
      )}
    </div>
  );
}
