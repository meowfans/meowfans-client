import { UsersEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type UtilsStore = {
  switchContext: UsersEntity | null;
  setSwitchContext: (switchContext: UsersEntity | null) => void;
};

export const useUtilsStore = create<UtilsStore>((set) => ({
  switchContext: null,
  setSwitchContext: (switchContext) => set({ switchContext })
}));
