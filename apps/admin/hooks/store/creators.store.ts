import { UsersEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CreatorsStore = {
  user: UsersEntity | null;
  setUser: (user: UsersEntity | null) => void;
  creators: UsersEntity[];
  setCreators: (creators: UsersEntity[]) => void;
};

export const useCreatorsStore = create<CreatorsStore>()((set) => ({
  user: null,
  creators: [],
  setUser: (user) => set({ user }),
  setCreators: (creators: UsersEntity[]) => set({ creators })
}));
