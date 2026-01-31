import { GetFollowingOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type FollowsStore = {
  followings: GetFollowingOutput[];
  setFollowings: (followings: GetFollowingOutput[]) => void;
};

export const useFollowingStore = create<FollowsStore>()((set) => ({
  followings: [],
  setFollowings: (followings: GetFollowingOutput[]) => set({ followings })
}));
