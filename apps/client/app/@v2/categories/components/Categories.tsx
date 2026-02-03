'use client';

import { useTags } from '@/hooks/useTags';
import { TagsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const CategoryCard = ({ tag, index }: { tag: TagsEntity; index: number }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Link href={`/categories/${encodeURIComponent(tag.label.trim())}`}>
        <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-indigo-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex items-center justify-between">
            <span className="text-lg font-medium text-zinc-200 transition-colors group-hover:text-white">{tag.label}</span>
            <Sparkles className="h-4 w-4 text-indigo-400 opacity-0 transition-all duration-300 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export const Categories = () => {
  const { handleLoadMore, hasMore, loading, tags } = useTags({ limit: 100 });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState<string>('All');

  // Alphabet generation
  const alphabet = useMemo(() => ['All', '#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')], []);

  // Filter and Group Logic
  const filteredGroups = useMemo(() => {
    // Deduplicate tags first
    const uniqueTagsMap = new Map();
    tags.forEach((tag) => {
      if (!uniqueTagsMap.has(tag.id)) {
        uniqueTagsMap.set(tag.id, tag);
      }
    });

    let filtered: TagsEntity[] = Array.from(uniqueTagsMap.values());

    // 1. Search Filter
    if (searchQuery) {
      filtered = filtered.filter((t) => t.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 2. Letter Grouping
    const groups: Record<string, TagsEntity[]> = {};
    filtered.forEach((tag) => {
      const firstChar = tag.label.charAt(0).toUpperCase();
      const key = /^[A-Z]/.test(firstChar) ? firstChar : '#';
      if (!groups[key]) groups[key] = [];
      groups[key].push(tag);
    });

    // 3. Filter by Active Letter Tab
    if (activeLetter !== 'All') {
      return { [activeLetter]: groups[activeLetter] || [] };
    }

    // Return all groups sorted alphabetically
    return Object.keys(groups)
      .sort()
      .reduce(
        (obj, key) => {
          obj[key] = groups[key];
          return obj;
        },
        {} as Record<string, TagsEntity[]>
      );
  }, [tags, searchQuery, activeLetter]);

  const isEmpty = Object.keys(filteredGroups).length === 0;

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden border-b border-border py-8 md:py-16 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />
        <div className="container relative z-10 px-4 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text"
          >
            Explore Categories
          </motion.h1>
          <p className="mt-4 max-w-[700px] text-sm md:text-xl">
            Discover content tailored to your interests. Browse our curated collection of communities and topics.
          </p>

          <div className="mt-6 md:mt-8 flex max-w-md items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search categories..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sticky Sidebar (Alphabet) */}
        <aside className="hidden md:block w-16 shrink-0">
          <div className="sticky top-24 flex flex-col items-center gap-1 rounded-full">
            <ScrollArea className="h-[calc(100vh-200px)] w-full px-1">
              <div className="flex flex-col items-center gap-1">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setActiveLetter(letter)}
                    className={cn('flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all')}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Mobile Horizontal Alphabet (Visible only on mobile) */}
        <div className="md:hidden overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-2 px-2">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={cn('flex h-9 min-w-9 items-center justify-center rounded-full text-sm font-medium transition-all border')}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-[500px]">
          <InfiniteScrollManager
            LoadingComponent={
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
              </div>
            }
            dataLength={tags.length}
            onLoadMore={handleLoadMore}
            hasMore={activeLetter === 'All' && !searchQuery && hasMore} // Only load more if filters are off
            loading={loading}
            scrollableDiv="v2-main-content"
          >
            {isEmpty && !loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-full bg-zinc-900 p-4 mb-4">
                  <Search className="h-8 w-8 text-zinc-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">No categories found</h3>
                <p className="text-zinc-500 mt-2">Try adjusting your search or filter.</p>
                <Button
                  variant="link"
                  className="mt-4 text-indigo-400"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveLetter('All');
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {Object.entries(filteredGroups).map(([letter, groupTags]) => (
                  <motion.div key={letter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-2xl font-bold text-white">{letter}</h2>
                      <div className="h-px flex-1 bg-zinc-800/50" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {groupTags.map((tag, i) => (
                        <CategoryCard key={tag.id} tag={tag} index={i} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </InfiniteScrollManager>
        </div>
      </div>
    </div>
  );
};
