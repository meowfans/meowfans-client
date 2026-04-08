import { ShadCnBackgrounds, Updater } from '@workspace/ui/lib';
import { create } from 'zustand';

type BackgroundStore = {
  bgModalOpen: boolean;
  setBgModalOpen: (updater: Updater<boolean>) => void;
  shadCnBackground: ShadCnBackgrounds | null;
  setBackground: (updater: Updater<ShadCnBackgrounds | null>) => void;
};

export const useShadCnBackgroundStore = create<BackgroundStore>()((set) => ({
  bgModalOpen: false,
  setBgModalOpen: (updater: Updater<boolean>) =>
    set((state) => ({ bgModalOpen: typeof updater === 'function' ? updater(state.bgModalOpen) : updater })),
  shadCnBackground: null,
  setBackground: (updater: Updater<ShadCnBackgrounds | null>) =>
    set((state) => ({ shadCnBackground: typeof updater === 'function' ? updater(state.shadCnBackground) : updater }))
}));
