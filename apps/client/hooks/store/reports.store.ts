import { ReportsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type ReportsUpdater = ReportsEntity[] | ((prev: ReportsEntity[]) => ReportsEntity[]);

type ReportsStore = {
  reports: ReportsEntity[];
  setReports: (updater: ReportsUpdater) => void;
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
