import { VaultObjectsEntity, VaultsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type VaultUpdater = VaultsEntity | ((prev: VaultsEntity) => VaultsEntity);
type VaultObjectsUpdater = VaultObjectsEntity[] | ((prev: VaultObjectsEntity[]) => VaultObjectsEntity[]);

type VaultsStore = {
  vault: VaultsEntity;
  vaults: VaultsEntity[];
  vaultObjects: VaultObjectsEntity[];
  setVault: (updater: VaultUpdater) => void;
  setVaults: (vaults: VaultsEntity[]) => void;
  appendVaults: (vaults: VaultsEntity[]) => void;
  setVaultObjects: (updater: VaultObjectsUpdater) => void;
  appendVaultObjects: (vaultObjects: VaultObjectsEntity[]) => void;
};

export const useVaultsStore = create<VaultsStore>()((set) => ({
  vaults: [],
  vault: {} as VaultsEntity,
  vaultObjects: [],
  setVault: (updater) =>
    set((state) => ({
      vault: typeof updater === 'function' ? (updater as (prev: VaultsEntity) => VaultsEntity)(state.vault) : updater
    })),
  setVaults: (vaults) => set(() => ({ vaults })),
  setVaultObjects: (updater) =>
    set((state) => ({
      vaultObjects:
        typeof updater === 'function' ? (updater as (prev: VaultObjectsEntity[]) => VaultObjectsEntity[])(state.vaultObjects) : updater
    })),
  appendVaults: (newVaults) => set((state) => ({ vaults: [...state.vaults, ...newVaults] })),
  appendVaultObjects: (newObjects) => set((state) => ({ vaultObjects: [...state.vaultObjects, ...newObjects] }))
}));
