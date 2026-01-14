import { create } from 'zustand';

type UtilsStore = {
  openAsstPickerModal: boolean;
  openLogoutModal: boolean;
  setOpenLogoutModal: (openLogoutModal: boolean) => void;
  setOpenAsstPickerModal: (openAsstPickerModal: boolean) => void;
};

export const useUtilsStore = create<UtilsStore>()((set) => ({
  openLogoutModal: false,
  openAsstPickerModal: false,
  setOpenAsstPickerModal: (openAsstPickerModal: boolean) => set({ openAsstPickerModal }),
  setOpenLogoutModal: (openLogoutModal: boolean) => set({ openLogoutModal })
}));
