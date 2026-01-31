import { CreatorAssetsEntity, GetFanAssetsOutput, GetPublicShortsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type AssetsStore = {
  fanAssets: GetFanAssetsOutput[];
  assets: CreatorAssetsEntity[];
  publicShorts: GetPublicShortsOutput[];
  setPublicShorts: (publicShorts: GetPublicShortsOutput[]) => void;
  setFanAssets: (fanAssets: GetFanAssetsOutput[]) => void;
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
