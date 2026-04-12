import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type UtilsStore = {
  clickedSearch: boolean;
  openLogoutModal: boolean;
  setOpenLogoutModal: (updater: Updater<boolean>) => void;
  setClickedSearch: (updater: Updater<boolean>) => void;
};

export const useUtilsStore = create<UtilsStore>()((set) => ({
  clickedSearch: false,
  openLogoutModal: false,
  setOpenLogoutModal: (updater) =>
    set((state) => ({ openLogoutModal: typeof updater === 'function' ? updater(state.openLogoutModal) : updater })),
  setClickedSearch: (updater) => set((state) => ({ clickedSearch: typeof updater === 'function' ? updater(state.clickedSearch) : updater }))
}));
