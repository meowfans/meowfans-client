'use client';

import { PageHeader } from '@/components/PageHeader';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import Link from 'next/link';

const NewCreators = () => {
  const { getCreators } = useCreators();
  const { creators } = getCreators({ sortBy: SortBy.UserCreatedAt, take: 20, orderBy: SortOrder.Desc });

  return (
    <div className="w-full">
      <PageHeader title="New Creators" zoneId="5772070" outstreamZoneId='5771264' />
      <div className="flex gap-2 pb-2 overflow-x-scroll snap-x snap-mandatory scroll-smooth">
        {creators.map((creator) => (
          <Link
            href={`/creators/${creator.username}`}
            key={creator.id}
            className="min-w-[150px] flex flex-col items-center bg-gray-50 dark:bg-neutral-900 snap-center p-3 rounded-md shadow-sm hover:shadow-md transition"
          >
            <SAvatar className="w-16 h-16 object-center rounded-full mb-2" url={creator.avatarUrl as string} />
            <p className="text-sm font-medium">{creator.username}</p>
            <p className="text-xs text-muted-foreground">{creator?.creatorProfile?.assetCount || 0} assets</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewCreators;
