import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type NotificationsStore = {
  allowNotification: boolean;
  allowMessagesNotification: boolean;
  allowInteractionsNotification: boolean;
  allowSystemNotification: boolean;
  setAllowNotification: (updater: Updater<boolean>) => void;
  setAllowMessagesNotification: (updater: Updater<boolean>) => void;
  setAllowInteractionsNotification: (updater: Updater<boolean>) => void;
  setAllowSystemNotification: (updater: Updater<boolean>) => void;
};

export const useNotificationsStore = create<NotificationsStore>()(
  persist(
    (set) => ({
      allowNotification: false,
      allowMessagesNotification: false,
      allowInteractionsNotification: false,
      allowSystemNotification: false,
      setAllowNotification: (updater) =>
        set((prev) => ({ allowNotification: typeof updater === 'function' ? updater(prev.allowNotification) : updater })),
      setAllowMessagesNotification: (updater) =>
        set((prev) => ({ allowMessagesNotification: typeof updater === 'function' ? updater(prev.allowMessagesNotification) : updater })),
      setAllowInteractionsNotification: (updater) =>
        set((prev) => ({
          allowInteractionsNotification: typeof updater === 'function' ? updater(prev.allowInteractionsNotification) : updater
        })),
      setAllowSystemNotification: (updater) =>
        set((prev) => ({ allowSystemNotification: typeof updater === 'function' ? updater(prev.allowSystemNotification) : updater }))
    }),
    { name: 'client-notifications-store', skipHydration: true, storage: createJSONStorage(() => localStorage) }
  )
);
