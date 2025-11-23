import { ExtendedUsersEntity, UsersEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CreatorsStore = {
  fanProfile: UsersEntity;
  creators: ExtendedUsersEntity[];
  setFanProfile: (profile: UsersEntity) => void;
  setCreators: (creators: ExtendedUsersEntity[]) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  creators: [],
  fanProfile: {} as UsersEntity,
  setFanProfile: (fanProfile: UsersEntity) => set({ fanProfile }),
  setCreators: (creators: ExtendedUsersEntity[]) => set({ creators })
}));
