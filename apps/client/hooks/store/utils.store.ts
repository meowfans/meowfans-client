import { create } from 'zustand';

type UtilsStore = {
  clickedSearch: boolean;
  openLogoutModal: boolean;
  setOpenLogoutModal: (openLogoutModal: boolean) => void;
  setClickedSearch: (clickedSearch: boolean) => void;
};

export const useUtilsStore = create<UtilsStore>()((set) => ({
  clickedSearch: false,
  openLogoutModal: false,
  setOpenLogoutModal: (openLogoutModal) => set({ openLogoutModal }),
  setClickedSearch: (clickedSearch) => set({ clickedSearch })
}));
