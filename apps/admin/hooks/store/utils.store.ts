import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type UtilsStore = {
  switchContext: UsersEntity | null;
  setSwitchContext: (updater: Updater<UsersEntity | null>) => void;
  openLogoutModal: boolean;
  setOpenLogoutModal: (updater: Updater<boolean>) => void;
  eventSource: EventSource | null;
  setEventSource: (eventSource: Updater<EventSource | null>) => void;
  terminateDownloadModal: boolean;
  setTerminateDownloadModal: (terminateDownloadModal: Updater<boolean>) => void;
  terminatingImportsModal: boolean;
  setTerminatingImportsModal: (open: Updater<boolean>) => void;
  openImportSheet: boolean;
  setOpenImportSheet: (opn: boolean) => void;
};

export const useUtilsStore = create<UtilsStore>((set) => ({
  eventSource: null,
  setEventSource: (eventSource: Updater<EventSource | null>) =>
    set((state) => ({ eventSource: typeof eventSource === 'function' ? eventSource(state.eventSource) : eventSource })),
  terminateDownloadModal: false,
  setTerminateDownloadModal: (terminateDownloadModal: Updater<boolean>) =>
    set((state) => ({
      terminateDownloadModal:
        typeof terminateDownloadModal === 'function' ? terminateDownloadModal(state.terminateDownloadModal) : terminateDownloadModal
    })),
  terminatingImportsModal: false,
  setTerminatingImportsModal: (open: Updater<boolean>) =>
    set((state) => ({ terminatingImportsModal: typeof open === 'function' ? open(state.terminatingImportsModal) : open })),
  openImportSheet: false,
  setOpenImportSheet: (opn: Updater<boolean>) =>
    set((state) => ({ openImportSheet: typeof opn === 'function' ? opn(state.openImportSheet) : opn })),
  switchContext: null,
  setSwitchContext: (updater) =>
    set((state) => ({ switchContext: typeof updater === 'function' ? updater(state.switchContext) : updater })),
  openLogoutModal: false,
  setOpenLogoutModal: (updater) =>
    set((state) => ({ openLogoutModal: typeof updater === 'function' ? updater(state.openLogoutModal) : updater }))
}));
