'use client';

import { GetCreatorProfileByAdminQuery } from '@workspace/gql/generated/graphql';

interface Props {
  creatorInfo?: GetCreatorProfileByAdminQuery;
}

export const Stats: React.FC<Props> = ({ creatorInfo }) => {
  return (
    <div className="grid grid-cols-5 gap-3 text-center">
      <div>
        <span className="text-xl font-bold">120.5K</span>
        <p className="text-sm text-muted-foreground">Likes</p>
      </div>
      <div>
        <span className="text-xl font-bold">{creatorInfo?.getCreatorProfileByAdmin.totalSubscriber}</span>
        <p className="text-sm text-muted-foreground">Followers</p>
      </div>
      <div>
        <span className="text-xl font-bold">{creatorInfo?.getCreatorProfileByAdmin.totalPost}</span>
        <p className="text-sm text-muted-foreground">Posts</p>
      </div>
      <div>
        <span className="text-xl font-bold">{creatorInfo?.getCreatorProfileByAdmin.totalPublicPost}</span>
        <p className="text-sm text-muted-foreground">Subscribers</p>
      </div>
      <div>
        <span className="text-xl font-bold">{creatorInfo?.getCreatorProfileByAdmin.totalExclusivePost}</span>
        <p className="text-sm text-muted-foreground">Exclusive</p>
      </div>
    </div>
  );
};
