import { GetAllObjectsCountOutput, GetVaultObjectsOutput, VaultsEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type VaultsObjectsStore = {
  vaultObjects: GetVaultObjectsOutput[];
  setVaultObjects: (updater: Updater<GetVaultObjectsOutput[]>) => void;
  objectsCount: GetAllObjectsCountOutput;
  setObjectsCount: (counts: Updater<GetAllObjectsCountOutput>) => void;
};

export const useVaultObjectsStore = create<VaultsObjectsStore>()((set) => ({
  vaultObjects: [],
  objectsCount: { fulfilled: 0, pending: 0, processing: 0, rejected: 0 },
  setObjectsCount: (counts: Updater<GetAllObjectsCountOutput>) =>
    set((state) => ({ objectsCount: typeof counts === 'function' ? counts(state.objectsCount) : counts })),
  setVaultObjects: (updater: Updater<GetVaultObjectsOutput[]>) =>
    set((state) => ({ vaultObjects: typeof updater === 'function' ? updater(state.vaultObjects) : updater }))
}));

type VaultsStore = {
  vaults: VaultsEntity[];
  setVaults: (updater: Updater<VaultsEntity[]>) => void;
};

export const useVaultsStore = create<VaultsStore>()((set) => ({
  vaults: [],
  setVaults: (updater: Updater<VaultsEntity[]>) =>
    set((state) => ({ vaults: typeof updater === 'function' ? updater(state.vaults) : updater }))
}));
