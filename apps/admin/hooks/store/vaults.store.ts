import { GetVaultObjectsOutput, UsersEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type VaultsStore = {
  vaultObjects: GetVaultObjectsOutput[];
  setVaultObjects: (updater: Updater<GetVaultObjectsOutput[]>) => void;
  eventSource: EventSource | null;
  setEventSource: (eventSource: Updater<EventSource | null>) => void;
  terminateDownloadModal: boolean;
  setTerminateDownloadModal: (terminateDownloadModal: Updater<boolean>) => void;
  creator: UsersEntity;
  setCreator: (creator: Updater<UsersEntity>) => void;
  terminatingImportsModal: boolean;
  setTerminatingImportsModal: (open: Updater<boolean>) => void;
  openImportSheet: boolean;
  setOpenImportSheet: (opn: boolean) => void;
};

export const useVaultsStore = create<VaultsStore>()((set) => ({
  vaultObjects: [],
  setVaultObjects: (updater: Updater<GetVaultObjectsOutput[]>) =>
    set((state) => ({ vaultObjects: typeof updater === 'function' ? updater(state.vaultObjects) : updater })),
  eventSource: null,
  setEventSource: (updater: Updater<EventSource | null>) =>
    set((state) => ({ eventSource: typeof updater === 'function' ? updater(state.eventSource) : updater })),
  terminateDownloadModal: false,
  setTerminateDownloadModal: (terminateDownloadModal: Updater<boolean>) =>
    set((state) => ({
      terminateDownloadModal:
        typeof terminateDownloadModal === 'function' ? terminateDownloadModal(state.terminateDownloadModal) : terminateDownloadModal
    })),
  creator: {} as UsersEntity,
  setCreator: (creator: Updater<UsersEntity>) =>
    set((state) => ({ creator: typeof creator === 'function' ? creator(state.creator) : creator })),
  terminatingImportsModal: false,
  setTerminatingImportsModal: (terminatingImportsModal: Updater<boolean>) =>
    set((state) => ({
      terminatingImportsModal:
        typeof terminatingImportsModal === 'function' ? terminatingImportsModal(state.terminatingImportsModal) : terminatingImportsModal
    })),
  openImportSheet: false,
  setOpenImportSheet: () => set((state) => ({ openImportSheet: !state.openImportSheet }))
}));
