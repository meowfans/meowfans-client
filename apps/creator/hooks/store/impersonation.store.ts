import { create } from 'zustand';

interface ImpersonationState {
  isImpersonating: boolean;
  expirationTime: number | null;
  setIsImpersonating: (isImpersonating: boolean) => void;
  setExpirationTime: (expirationTime: number | null) => void;
}

export const useImpersonationStore = create<ImpersonationState>((set) => ({
  isImpersonating: false,
  expirationTime: null,
  setIsImpersonating: (isImpersonating) => set({ isImpersonating }),
  setExpirationTime: (expirationTime) => set({ expirationTime })
}));
