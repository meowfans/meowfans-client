import { CreatorFollowsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type FollowersStore = {
  followers: CreatorFollowsEntity[];
  setFollowers: (followers: CreatorFollowsEntity[]) => void;
};

export const useFollowerStore = create<FollowersStore>()((set) => ({
  followers: [],
  setFollowers: (followers: CreatorFollowsEntity[]) => set({ followers })
}));
