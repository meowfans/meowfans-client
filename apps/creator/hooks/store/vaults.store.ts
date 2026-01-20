import { VaultsEntity, VaultStatsAnalyticsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type VaultsStore = {
  vaultAnalytics: VaultStatsAnalyticsOutput[];
  setVaultAnalytics: (vaultAnalytics: VaultStatsAnalyticsOutput[]) => void;
  vaults: VaultsEntity[];
  setVaults: (vaults: VaultsEntity[]) => void;
};

export const useVaultsStore = create<VaultsStore>((set) => ({
  vaults: [],
  vaultAnalytics: [],
  setVaultAnalytics: (vaultAnalytics) => set({ vaultAnalytics }),
  setVaults: (vaults) => set({ vaults })
}));
