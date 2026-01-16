'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useFollowers } from '@/hooks/useFollowers';
import { SortOrder } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { FollowerCard } from './FollowerCard';
import { NoFollowers } from './NoFollowers';
import { FollowerProfileCard } from './FollowerProfileCard';

export const Followers = () => {
  const { creator } = useCreator();
  const [search, setSearch] = useState('');
  const { followers, handleLoadMore, hasMore, loading } = useFollowers({ take: 30, orderBy: SortOrder.Desc });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={followers.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
        <section className="mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-6 space-y-4 pb-24 md:pb-8">
          <FollowerProfileCard />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">Followers</h1>
              <Badge variant="secondary">{creator.followersCount}</Badge>
            </div>

            <div className="relative w-full sm:w-[320px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Followers"
                className="pl-9"
                aria-label="Search followers"
              />
            </div>
          </div>

          {followers.length === 0 ? (
            <NoFollowers />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {followers.map((f) => (
                <FollowerCard
                  key={f.fanId}
                  username={f.fanProfile.user.username}
                  avatarUrl={f.fanProfile.user.username}
                  location={'Argentina'}
                />
              ))}
            </div>
          )}
        </section>
      </InfiniteScrollManager>
    </PageManager>
  );
};
