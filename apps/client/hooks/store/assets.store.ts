import { AssetsEntity, CreatorAssetsEntity, FanAssetsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type AssetsStore = {
  fanAssets: FanAssetsEntity[];
  assets: CreatorAssetsEntity[];
  publicShorts: AssetsEntity[];
  setPublicShorts: (publicShorts: AssetsEntity[]) => void;
  setFanAssets: (fanAssets: FanAssetsEntity[]) => void;
  setAssets: (assets: CreatorAssetsEntity[]) => void;
};

export const useAssetsStore = create<AssetsStore>()((set) => ({
  assets: [],
  fanAssets: [],
  publicShorts: [],
  setFanAssets: (fanAssets) => set({ fanAssets }),
  setPublicShorts: (publicShorts) => set({ publicShorts }),
  setAssets: (assets: CreatorAssetsEntity[]) => set({ assets })
}));
