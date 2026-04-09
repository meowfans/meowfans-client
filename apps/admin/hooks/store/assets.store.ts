import { GetCreatorAssetsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type AssetsStore = {
  assets: GetCreatorAssetsOutput[];
  updated: boolean;
  deleteModal: boolean;
  openUploadModal: boolean;
  canSelect: boolean;
  selectedAssets: string[];
  rangeSelection: boolean;
  option: boolean;
  toggleSelect: (assets: string) => void;
  setAssets: (assets: GetCreatorAssetsOutput[]) => void;
  setUpdated: (updated: boolean) => void;
  setDeleteModal: (deleteModal: boolean) => void;
  setCanSelect: (canSelect: boolean) => void;
  setOpenUploadModal: (open: boolean) => void;
  setRangeSelection: (rangeSelection: boolean) => void;
  setSelectedAssets: (assets: string[]) => void;
  setOption: (open: boolean) => void;
};

export const useAssetsStore = create<AssetsStore>()((set) => ({
  assets: [],
  setAssets: (assets: GetCreatorAssetsOutput[]) => set({ assets }),
  updated: false,
  setUpdated: (updated: boolean) => set(() => ({ updated })),
  option: false,
  setOption: (option: boolean) => set(() => ({ option })),
  rangeSelection: false,
  setRangeSelection: (rangeSelection: boolean) => set(() => ({ rangeSelection })),
  deleteModal: false,
  setDeleteModal: (deleteModal: boolean) => set(() => ({ deleteModal })),
  canSelect: false,
  setCanSelect: (canSelect: boolean) => set(() => ({ canSelect })),
  openUploadModal: false,
  setOpenUploadModal: (openUploadModal: boolean) => set(() => ({ openUploadModal })),
  selectedAssets: [],
  setSelectedAssets: (assets: string[]) => set({ selectedAssets: assets }),
  toggleSelect: (assetId) =>
    set((state) => {
      const isSelected = state.selectedAssets.includes(assetId);
      return {
        selectedAssets: isSelected ? state.selectedAssets.filter((id) => id !== assetId) : [...state.selectedAssets, assetId]
      };
    })
}));
