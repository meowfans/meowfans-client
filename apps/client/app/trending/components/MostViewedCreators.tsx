'use client';

import { NextImage } from '@/components/NextImage';
import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import Link from 'next/link';

const MostViewedCreators = () => {
  const { getCreators } = useCreators();
  const { creators } = getCreators({ sortBy: SortBy.CreatorFollowingCount, take: 20, orderBy: SortOrder.Desc });

  return (
    <div className="mb-6 p-1">
      <div className="grid gap-1 grid-cols-1 md:grid-cols-4 p-1">
        {creators.map((creator) => (
          <Link
            href={`/creators/${creator.username}`}
            key={creator.id}
            className="bg-gray-50 dark:bg-neutral-900 rounded-xs overflow-hidden hover:shadow-md transition"
          >
            <NextImage imageUrl={creator.avatarUrl as string} />

            <div className="p-2 text-center">
              <p className="font-medium text-sm">{creator.username}</p>
              {/* <p className="text-xs text-muted-foreground">{creator.creatorProfile?.vaultObjectCount || 0} assets</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default MostViewedCreators;
