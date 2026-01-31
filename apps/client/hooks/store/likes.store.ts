import { GetLikedPostsOutput, GetLikedVaultObjectsOutput, GetLikedVaultsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type LikesStore = {
  postLikes: GetLikedPostsOutput[];
  vaultLikes: GetLikedVaultsOutput[];
  vaultObjectLikes: GetLikedVaultObjectsOutput[];
  setPostLikes: (postLikes: GetLikedPostsOutput[]) => void;
  appendVaultLikes: (vaults: GetLikedVaultsOutput[]) => void;
  setVaultLikes: (vaultLikes: GetLikedVaultsOutput[]) => void;
  appendVaultObjectLikes: (vaultObjects: GetLikedVaultObjectsOutput[]) => void;
  setVaultObjectLikes: (vaultObjectLikes: GetLikedVaultObjectsOutput[]) => void;
};

export const useLikesStore = create<LikesStore>()((set) => ({
  postLikes: [],
  vaultLikes: [],
  vaultObjectLikes: [],
  setPostLikes: (postLikes: GetLikedPostsOutput[]) => set({ postLikes }),
  setVaultLikes: (vaultLikes) => set({ vaultLikes }),
  setVaultObjectLikes: (vaultObjectLikes: GetLikedVaultObjectsOutput[]) => set({ vaultObjectLikes }),
  appendVaultLikes: (newVaults) => set((state) => ({ vaultLikes: [...newVaults, ...state.vaultLikes] })),
  appendVaultObjectLikes: (newObjects) => set((state) => ({ vaultObjectLikes: [...newObjects, ...state.vaultObjectLikes] }))
}));
