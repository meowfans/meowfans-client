import { GetFollowingOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type FollowsStore = {
  followings: GetFollowingOutput[];
  setFollowings: (updater: Updater<GetFollowingOutput[]>) => void;
};

export const useFollowingStore = create<FollowsStore>()((set) => ({
  followings: [],
  setFollowings: (updater) =>
    set((state) => ({
      followings:
        typeof updater === 'function' ? (updater as (prev: GetFollowingOutput[]) => GetFollowingOutput[])(state.followings) : updater
    }))
}));
