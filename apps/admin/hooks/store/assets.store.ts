import { GetAllAssetsOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type AssetsStore = {
  assets: GetAllAssetsOutput | null;
  updated: boolean;
  deleteModal: boolean;
  openUploadModal: boolean;
  canSelect: boolean;
  selectedAssets: string[];
  rangeSelection: boolean;
  option: boolean;
  toggleSelect: (assets: string) => void;
  setAssets: (updater: Updater<GetAllAssetsOutput | null>) => void;
  setUpdated: (updater: Updater<boolean>) => void;
  setDeleteModal: (updater: Updater<boolean>) => void;
  setCanSelect: (updater: Updater<boolean>) => void;
  setOpenUploadModal: (updater: Updater<boolean>) => void;
  setRangeSelection: (updater: Updater<boolean>) => void;
  setSelectedAssets: (updater: Updater<string[]>) => void;
  setOption: (updater: Updater<boolean>) => void;
};

export const useAssetsStore = create<AssetsStore>()((set) => ({
  assets: null,
  setAssets: (assets: Updater<GetAllAssetsOutput | null>) =>
    set((state) => ({ assets: typeof assets === 'function' ? assets(state.assets) : assets })),
  updated: false,
  setUpdated: (updater: Updater<boolean>) =>
    set((state) => ({ updated: typeof updater === 'function' ? updater(state.updated) : updater })),
  option: false,
  setOption: (updater: Updater<boolean>) => set((state) => ({ option: typeof updater === 'function' ? updater(state.option) : updater })),
  rangeSelection: false,
  setRangeSelection: (updater: Updater<boolean>) =>
    set((state) => ({ rangeSelection: typeof updater === 'function' ? updater(state.rangeSelection) : updater })),
  deleteModal: false,
  setDeleteModal: (updater: Updater<boolean>) =>
    set((state) => ({ deleteModal: typeof updater === 'function' ? updater(state.deleteModal) : updater })),
  canSelect: false,
  setCanSelect: (updater: Updater<boolean>) =>
    set((state) => ({ canSelect: typeof updater === 'function' ? updater(state.canSelect) : updater })),
  openUploadModal: false,
  setOpenUploadModal: (updater: Updater<boolean>) =>
    set((state) => ({ openUploadModal: typeof updater === 'function' ? updater(state.openUploadModal) : updater })),
  selectedAssets: [],
  setSelectedAssets: (updater: Updater<string[]>) =>
    set((state) => ({ selectedAssets: typeof updater === 'function' ? updater(state.selectedAssets) : updater })),
  toggleSelect: (assetId) =>
    set((state) => {
      const isSelected = state.selectedAssets.includes(assetId);
      return {
        selectedAssets: isSelected ? state.selectedAssets.filter((id) => id !== assetId) : [...state.selectedAssets, assetId]
      };
    })
}));
