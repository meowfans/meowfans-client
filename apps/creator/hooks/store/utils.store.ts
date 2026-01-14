import { BackGroundColors } from '@workspace/ui/lib/enums';
import { create } from 'zustand';

type UtilsStore = {
  openAsstPickerModal: boolean;
  openLogoutModal: boolean;
  bgColor: BackGroundColors;
  setBgColor: (bgColor: BackGroundColors) => void;
  setOpenLogoutModal: (openLogoutModal: boolean) => void;
  setOpenAsstPickerModal: (openAsstPickerModal: boolean) => void;
};

export const useUtilsStore = create<UtilsStore>()((set) => ({
  bgColor: BackGroundColors.DEFAULT,
  openLogoutModal: false,
  openAsstPickerModal: false,
  setBgColor: (bgColor: BackGroundColors) => set({ bgColor }),
  setOpenAsstPickerModal: (openAsstPickerModal: boolean) => set({ openAsstPickerModal }),
  setOpenLogoutModal: (openLogoutModal: boolean) => set({ openLogoutModal })
}));
