import { CreatorFollowsEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type FollowersStore = {
  followers: CreatorFollowsEntity[];
  setFollowers: (updater: Updater<CreatorFollowsEntity[]>) => void;
};

export const useFollowerStore = create<FollowersStore>()((set) => ({
  followers: [],
  setFollowers: (updater: Updater<CreatorFollowsEntity[]>) =>
    set((state) => ({ followers: typeof updater === 'function' ? updater(state.followers) : updater }))
}));
