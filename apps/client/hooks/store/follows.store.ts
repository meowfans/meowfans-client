import { CreatorFollowsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type FollowsStore = {
  followings: CreatorFollowsEntity[];
  setFollowings: (followings: CreatorFollowsEntity[]) => void;
};

export const useFollowingStore = create<FollowsStore>()((set) => ({
  followings: [],
  setFollowings: (followings: CreatorFollowsEntity[]) => set({ followings })
}));
