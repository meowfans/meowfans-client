import { AssetsEntity, CreatorAssetsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type AssetsStore = {
  updated: boolean;
  setUpdated: (updated: boolean) => void;
  deleteModal: boolean;
  setDeleteModal: (deleteModal: boolean) => void;
  canSelect: boolean;
  setCanSelect: (canSelect: boolean) => void;
  openUploadModal: boolean;
  setOpenUploadModal: (open: boolean) => void;
  selectedAssets: string[];
  toggleSelect: (assets: string) => void;
  rangeSelection: boolean;
  setRangeSelection: (rangeSelection: boolean) => void;
  setSelectedAssets: (assets: string[]) => void;
  option: boolean;
  setOption: (open: boolean) => void;
  assets: CreatorAssetsEntity[];
  setAssets: (assets: CreatorAssetsEntity[]) => void;
  selectedAssetsRecord: AssetsEntity[];
  setSelectedAssetsRecord: (assets: AssetsEntity[]) => void;
};

export const useAssetsStore = create<AssetsStore>()((set) => ({
  selectedAssetsRecord: [],
  setSelectedAssetsRecord: (selectedAssetsRecord: AssetsEntity[]) => set({ selectedAssetsRecord }),
  assets: [],
  setAssets: (assets: CreatorAssetsEntity[]) => set({ assets }),
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
