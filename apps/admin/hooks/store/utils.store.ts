import { create } from 'zustand';

type UtilsStore = {
  switchContext: boolean;
  setSwitchContext: (switchContext: boolean) => void;
};

export const useUtilsStore = create<UtilsStore>((set) => ({
  switchContext: false,
  setSwitchContext: (switchContext) => set({ switchContext })
}));
