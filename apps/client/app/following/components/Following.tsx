'use client';

import { useFollowings } from '@/hooks/useFollow';
import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
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

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <FollowingHeader />
      <FollowingGrid creators={creators} loading={loading} hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
}
