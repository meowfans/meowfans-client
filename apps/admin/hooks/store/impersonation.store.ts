import { create } from 'zustand';

interface ImpersonationState {
  isOpen: boolean;
  creatorId: string | null;
  onOpen: (creatorId: string) => void;
  onClose: () => void;
}

export const useImpersonationStore = create<ImpersonationState>((set) => ({
  isOpen: false,
  creatorId: null,
  onOpen: (creatorId) => set({ isOpen: true, creatorId }),
  onClose: () => set({ isOpen: false, creatorId: null })
}));
