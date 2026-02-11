'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ContentBlurStore {
  isBlurEnabled: boolean;
  setBlurEnabled: (enabled: boolean) => void;
  toggleBlur: () => void;
}

export const useContentBlur = create<ContentBlurStore>()(
  persist(
    (set) => ({
      isBlurEnabled: true, // Default to true
      setBlurEnabled: (enabled: boolean) => set({ isBlurEnabled: enabled }),
      toggleBlur: () => set((state) => ({ isBlurEnabled: !state.isBlurEnabled }))
    }),
    {
      name: 'content-blur-storage'
    }
  )
);
