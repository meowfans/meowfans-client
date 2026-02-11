import { GetLikedPostsOutput, GetLikedVaultObjectsOutput, GetLikedVaultsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type PostLikesUpdater = GetLikedPostsOutput[] | ((prev: GetLikedPostsOutput[]) => GetLikedPostsOutput[]);
type VaultLikesUpdater = GetLikedVaultsOutput[] | ((prev: GetLikedVaultsOutput[]) => GetLikedVaultsOutput[]);
type VaultObjectLikesUpdater = GetLikedVaultObjectsOutput[] | ((prev: GetLikedVaultObjectsOutput[]) => GetLikedVaultObjectsOutput[]);

type LikesStore = {
  postLikes: GetLikedPostsOutput[];
  vaultLikes: GetLikedVaultsOutput[];
  vaultObjectLikes: GetLikedVaultObjectsOutput[];
  setPostLikes: (updater: PostLikesUpdater) => void;
  appendVaultLikes: (vaults: GetLikedVaultsOutput[]) => void;
  setVaultLikes: (updater: VaultLikesUpdater) => void;
  appendVaultObjectLikes: (vaultObjects: GetLikedVaultObjectsOutput[]) => void;
  setVaultObjectLikes: (updater: VaultObjectLikesUpdater) => void;
};

export const useLikesStore = create<LikesStore>()((set) => ({
  postLikes: [],
  vaultLikes: [],
  vaultObjectLikes: [],
  setPostLikes: (updater) =>
    set((state) => ({
      postLikes:
        typeof updater === 'function' ? (updater as (prev: GetLikedPostsOutput[]) => GetLikedPostsOutput[])(state.postLikes) : updater
    })),
  setVaultLikes: (updater) =>
    set((state) => ({
      vaultLikes:
        typeof updater === 'function' ? (updater as (prev: GetLikedVaultsOutput[]) => GetLikedVaultsOutput[])(state.vaultLikes) : updater
    })),
  setVaultObjectLikes: (updater) =>
    set((state) => ({
      vaultObjectLikes:
        typeof updater === 'function'
          ? (updater as (prev: GetLikedVaultObjectsOutput[]) => GetLikedVaultObjectsOutput[])(state.vaultObjectLikes)
          : updater
    })),
  appendVaultLikes: (newVaults) => set((state) => ({ vaultLikes: [...state.vaultLikes, ...newVaults] })),
  appendVaultObjectLikes: (newObjects) => set((state) => ({ vaultObjectLikes: [...state.vaultObjectLikes, ...newObjects] }))
}));
