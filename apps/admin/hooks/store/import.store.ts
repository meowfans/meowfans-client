import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type ImportStore = {
  importStatus: string;
  setImportStatus: (updater: Updater<string>) => void;
  importProcess: {
    method: string;
    username: string;
    creatorId: string;
    totalBranches: number;
    processedBranches: number;
    totalPages: number;
    processedPages: number;
    totalUrls: number;
    processedUrls: number;
  } | null;
  setImportProcess: (updater: Updater<ImportStore['importProcess']>) => void;
};

export const useImportStore = create<ImportStore>((set) => ({
  importStatus: '',
  setImportStatus: (updater) =>
    set((state) => ({
      importStatus: typeof updater === 'function' ? updater(state.importStatus) : updater
    })),
  importProcess: null,
  setImportProcess: (updater) =>
    set((state) => ({
      importProcess: typeof updater === 'function' ? updater(state.importProcess) : updater
    }))
}));
