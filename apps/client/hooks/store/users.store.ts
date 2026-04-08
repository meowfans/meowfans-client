import { GetDefaultCreatorsOutput, UsersEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type CreatorsStore = {
  fanProfile: UsersEntity;
  creators: GetDefaultCreatorsOutput[];
  setFanProfile: (updater: Updater<UsersEntity>) => void;
  setCreators: (updater: Updater<GetDefaultCreatorsOutput[]>) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  creators: [],
  fanProfile: {} as UsersEntity,
  setFanProfile: (updater) => set((state) => ({ fanProfile: typeof updater === 'function' ? updater(state.fanProfile) : updater })),
  setCreators: (updater) =>
    set((state) => ({
      creators:
        typeof updater === 'function'
          ? (updater as (prev: GetDefaultCreatorsOutput[]) => GetDefaultCreatorsOutput[])(state.creators)
          : updater
    }))
}));
