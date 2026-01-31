import { GetPublicSingleVaultOutput, GetPublicVaultObjectsOutput, GetPublicVaultsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type VaultUpdater = GetPublicSingleVaultOutput | ((prev: GetPublicSingleVaultOutput) => GetPublicSingleVaultOutput);
type VaultObjectsUpdater = GetPublicVaultObjectsOutput[] | ((prev: GetPublicVaultObjectsOutput[]) => GetPublicVaultObjectsOutput[]);
type VaultsUpdater = GetPublicVaultsOutput[] | ((prev: GetPublicVaultsOutput[]) => GetPublicVaultsOutput[]);

type VaultsStore = {
  vault: GetPublicSingleVaultOutput;
  vaults: GetPublicVaultsOutput[];
  vaultObjects: GetPublicVaultObjectsOutput[];
  setVault: (updater: VaultUpdater) => void;
  setVaults: (updater: VaultsUpdater) => void;
  setVaultObjects: (updater: VaultObjectsUpdater) => void;
};

export const useVaultsStore = create<VaultsStore>()((set) => ({
  vaults: [],
  vault: {} as GetPublicSingleVaultOutput,
  vaultObjects: [],
  setVault: (updater) =>
    set((state) => ({
      vault:
        typeof updater === 'function' ? (updater as (prev: GetPublicSingleVaultOutput) => GetPublicSingleVaultOutput)(state.vault) : updater
    })),
  setVaults: (updater) =>
    set((state) => ({
      vaults:
        typeof updater === 'function' ? (updater as (prev: GetPublicVaultsOutput[]) => GetPublicVaultsOutput[])(state.vaults) : updater
    })),
  setVaultObjects: (updater) =>
    set((state) => ({
      vaultObjects:
        typeof updater === 'function'
          ? (updater as (prev: GetPublicVaultObjectsOutput[]) => GetPublicVaultObjectsOutput[])(state.vaultObjects)
          : updater
    }))
}));
