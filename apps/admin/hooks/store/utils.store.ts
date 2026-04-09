import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type UtilsStore = {
  importStatus: string;
  setImportStatus: (updater: Updater<string>) => void;
  switchContext: UsersEntity | null;
  setSwitchContext: (updater: Updater<UsersEntity | null>) => void;
  openLogoutModal: boolean;
  setOpenLogoutModal: (updater: Updater<boolean>) => void;
};

export const useUtilsStore = create<UtilsStore>((set) => ({
  importStatus: '',
  setImportStatus: (updater) =>
    set((state) => ({
      importStatus: typeof updater === 'function' ? updater(state.importStatus) : updater
    })),
  switchContext: null,
  setSwitchContext: (updater) =>
    set((state) => ({ switchContext: typeof updater === 'function' ? updater(state.switchContext) : updater })),
  openLogoutModal: false,
  setOpenLogoutModal: (updater) =>
    set((state) => ({ openLogoutModal: typeof updater === 'function' ? updater(state.openLogoutModal) : updater }))
}));
