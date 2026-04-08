import { GetPublicSingleVaultOutput, GetPublicVaultObjectsOutput, GetPublicVaultsOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type VaultsStore = {
  vault: GetPublicSingleVaultOutput;
  vaults: GetPublicVaultsOutput[];
  vaultObjects: GetPublicVaultObjectsOutput[];
  setVault: (updater: Updater<GetPublicSingleVaultOutput>) => void;
  setVaults: (updater: Updater<GetPublicVaultsOutput[]>) => void;
  setVaultObjects: (updater: Updater<GetPublicVaultObjectsOutput[]>) => void;
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
