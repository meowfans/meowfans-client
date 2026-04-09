import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type CreatorsUpdater = UsersEntity[] | ((prev: UsersEntity[]) => UsersEntity[]);

type CreatorsStore = {
  user: UsersEntity | null;
  setUser: (updater: Updater<UsersEntity | null>) => void;
  creators: UsersEntity[];
  setCreators: (updater: Updater<UsersEntity[]>) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  user: null,
  creators: [],
  setUser: (updater) => set((state) => ({ user: typeof updater === 'function' ? updater(state.user) : updater })),
  setCreators: (updater: Updater<UsersEntity[]>) =>
    set((state) => {
      return {
        creators: typeof updater === 'function' ? updater(state.creators) : updater
      };
    })
}));
