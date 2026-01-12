import { ShadCnBackgrounds } from '@workspace/ui/lib';
import { create } from 'zustand';

type BackgroundStore = {
  bgModalOpen: boolean;
  setBgModalOpen: (open: boolean) => void;
  shadCnBackground: ShadCnBackgrounds | null;
  setBackground: (bg: ShadCnBackgrounds | null) => void;
};

export const useShadCnBackgroundStore = create<BackgroundStore>()((set) => ({
  bgModalOpen: false,
  setBgModalOpen: () => set((state) => ({ bgModalOpen: !state.bgModalOpen })),
  shadCnBackground: null,
  setBackground: (shadCnBackground: ShadCnBackgrounds | null) => set(() => ({ shadCnBackground }))
}));
