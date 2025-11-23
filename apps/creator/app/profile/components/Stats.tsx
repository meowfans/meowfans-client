'use client';

import { useCreator } from '@/hooks/useCreator';

export const Stats = () => {
  const { creator } = useCreator();
  return (
    <div className="grid grid-cols-5 gap-3 text-center">
      <div>
        <span className="text-xl font-bold">120.5K</span>
        <p className="text-sm text-muted-foreground">Likes</p>
      </div>
      <div>
        <span className="text-xl font-bold">{creator.totalSubscriber}</span>
        <p className="text-sm text-muted-foreground">Followers</p>
      </div>
      <div>
        <span className="text-xl font-bold">{creator.totalPost}</span>
        <p className="text-sm text-muted-foreground">Posts</p>
      </div>
      <div>
        <span className="text-xl font-bold">{creator.totalPublicPost}</span>
        <p className="text-sm text-muted-foreground">Subscribers</p>
      </div>
      <div>
        <span className="text-xl font-bold">{creator.totalExclusivePost}</span>
        <p className="text-sm text-muted-foreground">Exclusive</p>
      </div>
    </div>
  );
};
