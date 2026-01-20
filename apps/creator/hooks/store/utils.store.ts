import { PostsEntity, VaultsEntity } from '@workspace/gql/generated/graphql';
import { BackGroundColors } from '@workspace/ui/lib/enums';
import { create } from 'zustand';

type UtilsStore = {
  shareModal: PostsEntity | null;
  shareVaultModal: VaultsEntity | null;
  setVaultShareModal: (shareVaultModal: null | VaultsEntity) => void;
  openLogoutModal: boolean;
  bgColor: BackGroundColors;
  openAsstPickerModal: boolean;
  setShareModal: (shareModal: null | PostsEntity) => void;
  setBgColor: (bgColor: BackGroundColors) => void;
  setOpenLogoutModal: (openLogoutModal: boolean) => void;
  setOpenAsstPickerModal: (openAsstPickerModal: boolean) => void;
};

export const useUtilsStore = create<UtilsStore>()((set) => ({
  shareModal: null,
  openLogoutModal: false,
  openAsstPickerModal: false,
  shareVaultModal: null,
  bgColor: BackGroundColors.DEFAULT,
  setBgColor: (bgColor: BackGroundColors) => set({ bgColor }),
  setVaultShareModal: (shareVaultModal) => set({ shareVaultModal }),
  setShareModal: (shareModal: PostsEntity | null) => set({ shareModal }),
  setOpenAsstPickerModal: (openAsstPickerModal: boolean) => set({ openAsstPickerModal }),
  setOpenLogoutModal: (openLogoutModal: boolean) => set({ openLogoutModal })
}));
