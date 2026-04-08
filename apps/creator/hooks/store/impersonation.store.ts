import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

interface ImpersonationState {
  isImpersonating: boolean;
  expirationTime: number | null;
  setIsImpersonating: (updater: Updater<boolean>) => void;
  setExpirationTime: (updater: Updater<number | null>) => void;
}

export const useImpersonationStore = create<ImpersonationState>((set) => ({
  isImpersonating: false,
  expirationTime: null,
  setIsImpersonating: (updater: Updater<boolean>) =>
    set((state) => ({ isImpersonating: typeof updater === 'function' ? updater(state.isImpersonating) : updater })),
  setExpirationTime: (updater: Updater<number | null>) =>
    set((state) => ({ expirationTime: typeof updater === 'function' ? updater(state.expirationTime) : updater }))
}));
