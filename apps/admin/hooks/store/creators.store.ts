import { UsersEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CreatorsStore = {
  creators: UsersEntity[];
  setCreators: (creators: UsersEntity[]) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  creators: [],
  setCreators: (creators: UsersEntity[]) => set({ creators })
}));
