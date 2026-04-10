import { GetAllObjectsCountOutput, UsersEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type CreatorsStore = {
  user: UsersEntity | null;
  setUser: (updater: Updater<UsersEntity | null>) => void;
  creators: UsersEntity[];
  setCreators: (updater: Updater<UsersEntity[]>) => void;
  creatorObjectsCount: GetAllObjectsCountOutput;
  setCreatorObjectsCount: (counts: Updater<GetAllObjectsCountOutput>) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  creatorObjectsCount: { fulfilled: 0, pending: 0, processing: 0, rejected: 0 },
  setCreatorObjectsCount: (counts: Updater<GetAllObjectsCountOutput>) =>
    set((state) => ({ creatorObjectsCount: typeof counts === 'function' ? counts(state.creatorObjectsCount) : counts })),
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
