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

export const Followers = () => {
  const { creator } = useCreator();
  const [search, setSearch] = useState('');
  const { followers, handleLoadMore, hasMore, loading } = useFollowers({ take: 30, orderBy: SortOrder.Desc });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={followers.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
        <section className="mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-6 space-y-4 pb-24 md:pb-8">
          <Card className="overflow-hidden py-0 gap-0">
            <div className="relative h-36 sm:h-52 w-full bg-muted">
              {creator?.user?.bannerUrl ? (
                <img src={creator.user.bannerUrl} alt="Profile banner" className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-primary/10 via-muted to-primary/5" />
              )}
            </div>

            <CardContent className="relative p-4 sm:p-6">
              <div className="-mt-10 sm:-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-3">
                  <Avatar className="size-20 border bg-background shadow-sm">
                    <AvatarImage src={creator?.user?.avatarUrl ?? ''} alt={creator?.user?.username ?? 'Avatar'} />
                    <AvatarFallback>
                      {(creator?.user?.firstName?.slice(0, 1) ?? 'M') + (creator?.user?.lastName?.slice(0, 1) ?? 'W')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="pb-1">
                    <p className="text-lg font-semibold leading-tight">
                      {creator?.user?.firstName} {creator?.user?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{creator?.creatorType?.toString?.() ?? 'Creator'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 rounded-xl border bg-background/70 px-4 py-3 text-center">
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold">{creator.totalPost}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold">{creator.followersCount}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold">{creator.totalSubscriber}</p>
                    <p className="text-xs text-muted-foreground">Subscribers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
          ) : followers.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-sm text-muted-foreground">No followers match your search.</p>
              </CardContent>
            </Card>
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
