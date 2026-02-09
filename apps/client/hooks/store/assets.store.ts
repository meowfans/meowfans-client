import { CreatorAssetsEntity, GetFanAssetsOutput, GetPublicShortsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type FanAssetsUpdater = GetFanAssetsOutput[] | ((prev: GetFanAssetsOutput[]) => GetFanAssetsOutput[]);
type AssetsUpdater = CreatorAssetsEntity[] | ((prev: CreatorAssetsEntity[]) => CreatorAssetsEntity[]);
type PublicShortsUpdater = GetPublicShortsOutput[] | ((prev: GetPublicShortsOutput[]) => GetPublicShortsOutput[]);

type AssetsStore = {
  fanAssets: GetFanAssetsOutput[];
  assets: CreatorAssetsEntity[];
  publicShorts: GetPublicShortsOutput[];
  setPublicShorts: (publicShorts: PublicShortsUpdater) => void;
  setFanAssets: (fanAssets: FanAssetsUpdater) => void;
  setAssets: (assets: AssetsUpdater) => void;
};

export const useAssetsStore = create<AssetsStore>()((set) => ({
  assets: [],
  fanAssets: [],
  publicShorts: [],
  setFanAssets: (updater) =>
    set((state) => ({
      fanAssets:
        typeof updater === 'function' ? (updater as (prev: GetFanAssetsOutput[]) => GetFanAssetsOutput[])(state.fanAssets) : updater
    })),
  setPublicShorts: (updater) =>
    set((state) => ({
      publicShorts:
        typeof updater === 'function'
          ? (updater as (prev: GetPublicShortsOutput[]) => GetPublicShortsOutput[])(state.publicShorts)
          : updater
    })),
  setAssets: (updater) =>
    set((state) => ({
      assets: typeof updater === 'function' ? (updater as (prev: CreatorAssetsEntity[]) => CreatorAssetsEntity[])(state.assets) : updater
    }))
}));
