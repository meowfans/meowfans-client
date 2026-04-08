import { ReportsEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type ReportsStore = {
  reports: ReportsEntity[];
  setReports: (updater: Updater<ReportsEntity[]>) => void;
  clearReports: () => void;
};

export const useReportsStore = create<ReportsStore>((set) => ({
  reports: [],
  setReports: (updater) =>
    set((state) => ({
      reports: typeof updater === 'function' ? updater(state.reports) : updater
    })),
  clearReports: () => set({ reports: [] })
}));
