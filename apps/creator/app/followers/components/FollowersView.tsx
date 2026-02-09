'use client';

import { useFollowers } from '@/hooks/useFollowers';
import { PaginationInput } from '@workspace/gql/generated/graphql';
import { Input } from '@workspace/ui/components/input';
import { Search, Users2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FollowersList } from './FollowersList';

export function FollowersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const params: PaginationInput = {
    take: 20,
    searchTerm: debouncedSearch || undefined // undefined if empty string
  };

  const { followers, loading, hasMore, handleLoadMore } = useFollowers(params);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 lg:p-10 space-y-10 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Users2 className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Community Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl  leading-none">Your Followers</h1>
          <p className="text-muted-foreground text-sm font-medium max-w-md">
            Engage with your fans and grow your community in the Creator Studio.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search followers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 pl-11 rounded-2xl bg-muted/50 border-none focus-visible:ring-primary/20 font-medium shadow-sm"
          />
        </div>
      </div>

      <div className="pt-2">
        <FollowersList followers={followers} loading={loading} hasMore={hasMore} onLoadMore={handleLoadMore} />
      </div>
    </div>
  );
}
