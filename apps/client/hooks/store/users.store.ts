import { GetDefaultCreatorsOutput, UsersEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CreatorsUpdater = GetDefaultCreatorsOutput[] | ((prev: GetDefaultCreatorsOutput[]) => GetDefaultCreatorsOutput[]);

type CreatorsStore = {
  fanProfile: UsersEntity;
  creators: GetDefaultCreatorsOutput[];
  setFanProfile: (profile: UsersEntity) => void;
  setCreators: (updater: CreatorsUpdater) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  creators: [],
  fanProfile: {} as UsersEntity,
  setFanProfile: (fanProfile: UsersEntity) => set({ fanProfile }),
  setCreators: (updater) =>
    set((state) => ({
      creators:
        typeof updater === 'function'
          ? (updater as (prev: GetDefaultCreatorsOutput[]) => GetDefaultCreatorsOutput[])(state.creators)
          : updater
    }))
}));
