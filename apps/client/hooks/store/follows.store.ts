import { GetFollowingOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type FollowingsUpdater = GetFollowingOutput[] | ((prev: GetFollowingOutput[]) => GetFollowingOutput[]);

type FollowsStore = {
  followings: GetFollowingOutput[];
  setFollowings: (updater: FollowingsUpdater) => void;
};

export const useFollowingStore = create<FollowsStore>()((set) => ({
  followings: [],
  setFollowings: (updater) =>
    set((state) => ({
      followings:
        typeof updater === 'function' ? (updater as (prev: GetFollowingOutput[]) => GetFollowingOutput[])(state.followings) : updater
    }))
}));
