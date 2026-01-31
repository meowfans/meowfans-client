import { GetDefaultCreatorsOutput, UsersEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CreatorsStore = {
  fanProfile: UsersEntity;
  creators: GetDefaultCreatorsOutput[];
  setFanProfile: (profile: UsersEntity) => void;
  setCreators: (creators: GetDefaultCreatorsOutput[]) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  creators: [],
  fanProfile: {} as UsersEntity,
  setFanProfile: (fanProfile: UsersEntity) => set({ fanProfile }),
  setCreators: (creators) => set({ creators })
}));
