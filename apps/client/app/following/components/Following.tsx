'use client';

import { useServerGetFollowings } from '@/hooks/server/useServerGetFollowings';
import { GetDefaultCreatorsOutput, GetFollowingOutput } from '@workspace/gql/generated/graphql';
import { useMemo } from 'react';
import { FollowingGrid } from './FollowingGrid';
import { FollowingHeader } from './FollowingHeader';

interface FollowingProps {
  initialFollowings: GetFollowingOutput[];
}

export function Following({ initialFollowings }: FollowingProps) {
  const { followings, loading, hasMore, loadMore } = useServerGetFollowings({ take: 30 }, initialFollowings);

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
    <div className="flex flex-1 flex-col overflow-y-auto bg-background/50 backdrop-blur-3xl p-2 h-screen">
      <FollowingHeader />
      <FollowingGrid initialCreators={creators} creators={creators} loading={loading} hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
}
