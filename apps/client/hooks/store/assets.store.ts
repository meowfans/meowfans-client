import { CreatorAssetsEntity, GetFanAssetsOutput, GetPublicShortsOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type AssetsStore = {
  fanAssets: GetFanAssetsOutput[];
  assets: CreatorAssetsEntity[];
  publicShorts: GetPublicShortsOutput[];
  setPublicShorts: (publicShorts: Updater<GetPublicShortsOutput[]>) => void;
  setFanAssets: (fanAssets: Updater<GetFanAssetsOutput[]>) => void;
  setAssets: (assets: Updater<CreatorAssetsEntity[]>) => void;
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
