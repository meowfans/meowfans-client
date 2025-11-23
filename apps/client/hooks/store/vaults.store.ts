import { VaultObjectsEntity, VaultsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type VaultsStore = {
  vault: VaultsEntity;
  vaults: VaultsEntity[];
  vaultObjects: VaultObjectsEntity[];
  setVault: (vault: VaultsEntity) => void;
  setVaults: (vaults: VaultsEntity[]) => void;
  appendVaults: (vaults: VaultsEntity[]) => void;
  setVaultObjects: (vaultObjects: VaultObjectsEntity[]) => void;
  appendVaultObjects: (vaultObjects: VaultObjectsEntity[]) => void;
};

export const useVaultsStore = create<VaultsStore>()(
  devtools((set) => ({
    vaults: [],
    vaultObjects: [],
    setVault: (vault) => set(() => ({ vault })),
    setVaults: (vaults) => set(() => ({ vaults })),
    setVaultObjects: (vaultObjects) => set(() => ({ vaultObjects })),
    appendVaults: (newVaults) => set((state) => ({ vaults: [...state.vaults, ...newVaults] })),
    appendVaultObjects: (newObjects) => set((state) => ({ vaultObjects: [...state.vaultObjects, ...newObjects] }))
  }))
);
