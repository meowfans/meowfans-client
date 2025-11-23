import { PostLikesEntity, VaultLikesEntity, VaultObjectsLikesEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type LikesStore = {
  postLikes: PostLikesEntity[];
  vaultLikes: VaultLikesEntity[];
  vaultObjectLikes: VaultObjectsLikesEntity[];
  setPostLikes: (postLikes: PostLikesEntity[]) => void;
  appendVaultLikes: (vaults: VaultLikesEntity[]) => void;
  setVaultLikes: (vaultLikes: VaultLikesEntity[]) => void;
  appendVaultObjectLikes: (vaultObjects: VaultObjectsLikesEntity[]) => void;
  setVaultObjectLikes: (vaultObjectLikes: VaultObjectsLikesEntity[]) => void;
};

export const useLikesStore = create<LikesStore>()((set) => ({
  postLikes: [],
  vaultLikes: [],
  vaultObjectLikes: [],
  setPostLikes: (postLikes: PostLikesEntity[]) => set({ postLikes }),
  setVaultLikes: (vaultLikes: VaultLikesEntity[]) => set({ vaultLikes }),
  setVaultObjectLikes: (vaultObjectLikes: VaultObjectsLikesEntity[]) => set({ vaultObjectLikes }),
  appendVaultLikes: (newVaults) => set((state) => ({ vaultLikes: [...newVaults, ...state.vaultLikes] })),
  appendVaultObjectLikes: (newObjects) => set((state) => ({ vaultObjectLikes: [...newObjects, ...state.vaultObjectLikes] }))
}));
