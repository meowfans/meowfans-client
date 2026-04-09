import { GetCreatorAssetsOutput, PostsEntity, VaultsEntity } from '@workspace/gql/generated/graphql';
import { BackGroundColors } from '@workspace/ui/lib/enums';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type UtilsStore = {
  shareModal: PostsEntity | null;
  shareVaultModal: VaultsEntity | null;
  setVaultShareModal: (updater: Updater<VaultsEntity | null>) => void;
  openLogoutModal: boolean;
  bgColor: BackGroundColors;
  openAsstPickerModal: boolean;
  showAssetsSidebar: boolean;
  selectedAssets: GetCreatorAssetsOutput[];
  setShareModal: (updater: Updater<PostsEntity | null>) => void;
  setBgColor: (updater: Updater<BackGroundColors>) => void;
  setOpenLogoutModal: (updater: Updater<boolean>) => void;
  setOpenAsstPickerModal: (updater: Updater<boolean>) => void;
  setShowAssetsSidebar: (updater: Updater<boolean>) => void;
  setSelectedAssets: (updater: Updater<GetCreatorAssetsOutput[]>) => void;
};

export const useUtilsStore = create<UtilsStore>()((set) => ({
  shareModal: null,
  openLogoutModal: false,
  openAsstPickerModal: false,
  showAssetsSidebar: false,
  selectedAssets: [],
  shareVaultModal: null,
  bgColor: BackGroundColors.DEFAULT,
  setBgColor: (updater: Updater<BackGroundColors>) =>
    set((state) => ({ bgColor: typeof updater === 'function' ? updater(state.bgColor) : updater })),
  setVaultShareModal: (updater: Updater<VaultsEntity | null>) =>
    set((state) => ({ shareVaultModal: typeof updater === 'function' ? updater(state.shareVaultModal) : updater })),
  setShareModal: (updater: Updater<PostsEntity | null>) =>
    set((state) => ({ shareModal: typeof updater === 'function' ? updater(state.shareModal) : updater })),
  setOpenAsstPickerModal: (updater: Updater<boolean>) =>
    set((state) => ({ openAsstPickerModal: typeof updater === 'function' ? updater(state.openAsstPickerModal) : updater })),
  setOpenLogoutModal: (updater: Updater<boolean>) =>
    set((state) => ({ openLogoutModal: typeof updater === 'function' ? updater(state.openLogoutModal) : updater })),
  setShowAssetsSidebar: (updater: Updater<boolean>) =>
    set((state) => ({ showAssetsSidebar: typeof updater === 'function' ? updater(state.showAssetsSidebar) : updater })),
  setSelectedAssets: (updater) =>
    set((state) => ({ selectedAssets: typeof updater === 'function' ? updater(state.selectedAssets) : updater }))
}));
