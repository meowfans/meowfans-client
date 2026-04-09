import { AssetsEntity, GetCreatorAssetsOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type AssetsStore = {
  updated: boolean;
  deleteModal: boolean;
  canSelect: boolean;
  openUploadModal: boolean;
  selectedAssets: string[];
  rangeSelection: boolean;
  option: boolean;
  assets: GetCreatorAssetsOutput[];
  selectedAssetsRecord: AssetsEntity[];
  toggleSelect: (assets: string) => void;
  setCanSelect: (updater: Updater<boolean>) => void;
  setUpdated: (updater: Updater<boolean>) => void;
  setRangeSelection: (updater: Updater<boolean>) => void;
  setOpenUploadModal: (updater: Updater<boolean>) => void;
  setSelectedAssets: (updater: Updater<string[]>) => void;
  setSelectedAssetsRecord: (updater: Updater<AssetsEntity[]>) => void;
  setOption: (updater: Updater<boolean>) => void;
  setAssets: (updater: Updater<GetCreatorAssetsOutput[]>) => void;
  setDeleteModal: (updater: Updater<boolean>) => void;
};

export const useAssetsStore = create<AssetsStore>()((set) => ({
  selectedAssetsRecord: [],
  setSelectedAssetsRecord: (updater: Updater<AssetsEntity[]>) =>
    set((state) => ({ selectedAssetsRecord: typeof updater === 'function' ? updater(state.selectedAssetsRecord) : updater })),
  assets: [],
  setAssets: (updater: Updater<GetCreatorAssetsOutput[]>) =>
    set((state) => ({ assets: typeof updater === 'function' ? updater(state.assets) : updater })),
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
