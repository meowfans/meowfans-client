import { UsersEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CreatorsStore = {
  fanProfile: UsersEntity;
  creators: UsersEntity[];
  setFanProfile: (profile: UsersEntity) => void;
  setCreators: (creators: UsersEntity[]) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  creators: [],
  fanProfile: {} as UsersEntity,
  setFanProfile: (fanProfile: UsersEntity) => set({ fanProfile }),
  setCreators: (creators: UsersEntity[]) => set({ creators })
}));
