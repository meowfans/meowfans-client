import { GetPostsInfoOutput, PostsEntity } from '@workspace/gql/generated/graphql';
import { BackGroundColors } from '@workspace/ui/lib/enums';
import { create } from 'zustand';

type UtilsStore = {
  shareModal: GetPostsInfoOutput | null;
  openLogoutModal: boolean;
  bgColor: BackGroundColors;
  openAsstPickerModal: boolean;
  setShareModal: (shareModal: null | GetPostsInfoOutput) => void;
  setBgColor: (bgColor: BackGroundColors) => void;
  setOpenLogoutModal: (openLogoutModal: boolean) => void;
  setOpenAsstPickerModal: (openAsstPickerModal: boolean) => void;
};

export const useUtilsStore = create<UtilsStore>()((set) => ({
  shareModal: null,
  openLogoutModal: false,
  openAsstPickerModal: false,
  bgColor: BackGroundColors.DEFAULT,
  setShareModal: (shareModal: GetPostsInfoOutput | null) => set({ shareModal }),
  setBgColor: (bgColor: BackGroundColors) => set({ bgColor }),
  setOpenAsstPickerModal: (openAsstPickerModal: boolean) => set({ openAsstPickerModal }),
  setOpenLogoutModal: (openLogoutModal: boolean) => set({ openLogoutModal })
}));
