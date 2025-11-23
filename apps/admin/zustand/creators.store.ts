import { ExtendedUsersEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CreatorsStore = {
  creators: ExtendedUsersEntity[];
  setCreators: (creators: ExtendedUsersEntity[]) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  creators: [],
  setCreators: (creators: ExtendedUsersEntity[]) => set({ creators })
}));
