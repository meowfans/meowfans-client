import { WatchHistoryEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type HistoryStore = {
  history: WatchHistoryEntity[];
  setHistory: (updater: Updater<WatchHistoryEntity[]>) => void;
  deleteHistory: (id: string) => void;
};

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],
  setHistory: (updater) => set((state) => ({ history: typeof updater === 'function' ? updater(state.history) : updater })),
  deleteHistory: (id) => set((state) => ({ history: state.history.filter((h) => h.id !== id) }))
}));
