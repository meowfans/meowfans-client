import { VaultsEntity, VaultStatsAnalyticsOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type VaultsStore = {
  vaultAnalytics: VaultStatsAnalyticsOutput[];
  setVaultAnalytics: (updater: Updater<VaultStatsAnalyticsOutput[]>) => void;
  vaults: VaultsEntity[];
  setVaults: (updater: Updater<VaultsEntity[]>) => void;
};

export const useVaultsStore = create<VaultsStore>((set) => ({
  vaults: [],
  vaultAnalytics: [],
  setVaultAnalytics: (updater) =>
    set((state) => ({ vaultAnalytics: typeof updater === 'function' ? updater(state.vaultAnalytics) : updater })),
  setVaults: (updater) => set((state) => ({ vaults: typeof updater === 'function' ? updater(state.vaults) : updater }))
}));
