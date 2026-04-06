import { WatchHistoryEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type HistoryUpdater = WatchHistoryEntity[] | ((prev: WatchHistoryEntity[]) => WatchHistoryEntity[]);

type HistoryStore = {
  history: WatchHistoryEntity[];
  setHistory: (updater: HistoryUpdater) => void;
  deleteHistory: (id: string) => void;
};

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],
  setHistory: (updater) => set((state) => ({ history: typeof updater === 'function' ? updater(state.history) : updater })),
  deleteHistory: (id) => set((state) => ({ history: state.history.filter((h) => h.id !== id) }))
}));
