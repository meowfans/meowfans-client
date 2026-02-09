'use client';

import { useFollowings } from '@/hooks/useFollow';
import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { Users } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { CreatorCard } from '../../creators/components/CreatorCard';

export function FollowingView() {
  const { followings, loading, hasMore, loadMore } = useFollowings();

  // Map FollowingOutput to DefaultCreatorsOutput for compatibility with CreatorCard
  const creators = useMemo<GetDefaultCreatorsOutput[]>(() => {
    return followings.map(
      (f) =>
        ({
          id: f.id,
          username: f.username,
          avatarUrl: f.avatarUrl,
          isFollowing: true
        }) as GetDefaultCreatorsOutput
    );
  }, [followings]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Loading Followings</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="flex-none p-6 pb-2">
        <h1 className="text-3xl font-bold tracking-tight">Following</h1>
        <p className="mt-1 text-muted-foreground">Stay updated with content from your favorite creators.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-scroll" id="following-scroll-wrapper">
        <InfiniteScrollManager
          dataLength={creators.length}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          scrollableDiv="following-scroll-wrapper"
          customHeight="h-full"
        >
          {!creators.length && !loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
                <Users className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h2 className="text-xl font-semibold">No followings yet</h2>
              <p className="mt-2 text-muted-foreground max-w-sm">
                You haven&apos;t followed any creators yet. Head over to the Explore page to discover amazing talent!
              </p>
              <Button asChild className="mt-6" variant="default">
                <Link href="/creators">Explore Creators</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 p-6 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          )}
          {loading && <Loading />}
        </InfiniteScrollManager>
      </div>
    </div>
  );
}
