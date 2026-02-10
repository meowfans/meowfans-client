'use client';

import { useFollowings } from '@/hooks/useFollow';
import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Loading } from '@workspace/ui/globals/Loading';
import { Users } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { FollowingGrid } from './FollowingGrid';
import { FollowingHeader } from './FollowingHeader';

export function Following() {
  const { followings, loading, hasMore, loadMore } = useFollowings();

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

  if (!creators.length && !loading) {
    return (
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
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <FollowingHeader />
      <FollowingGrid creators={creators} loading={loading} hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
}
