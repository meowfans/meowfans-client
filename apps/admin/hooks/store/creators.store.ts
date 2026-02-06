import { UsersEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CreatorsUpdater = UsersEntity[] | ((prev: UsersEntity[]) => UsersEntity[]);

type CreatorsStore = {
  user: UsersEntity | null;
  setUser: (user: UsersEntity | null) => void;
  creators: UsersEntity[];
  setCreators: (creators: CreatorsUpdater) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  user: null,
  creators: [],
  setUser: (user) => set({ user }),
  setCreators: (updater: CreatorsUpdater) =>
    set((state) => {
      return {
        creators: typeof updater === 'function' ? (updater as (prev: UsersEntity[]) => UsersEntity[])(state.creators) : updater
      };
    })
}));
