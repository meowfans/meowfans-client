import { create } from 'zustand';

type UtilsStore = {
  openLogoutModal: boolean;
  setOpenLogoutModal: (openLogoutModal: boolean) => void;
};

export const useUtilsStore = create<UtilsStore>()((set) => ({
  openLogoutModal: false,
  setOpenLogoutModal: (openLogoutModal) => set({ openLogoutModal })
}));
