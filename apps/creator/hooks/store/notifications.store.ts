import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type NotificationUpdater = boolean | ((prev: boolean) => boolean);

type NotificationsStore = {
  allowNotification: boolean;
  allowMessagesNotification: boolean;
  allowInteractionsNotification: boolean;
  allowSystemNotification: boolean;
  setAllowNotification: (updater: NotificationUpdater) => void;
  setAllowMessagesNotification: (updater: NotificationUpdater) => void;
  setAllowInteractionsNotification: (updater: NotificationUpdater) => void;
  setAllowSystemNotification: (updater: NotificationUpdater) => void;
};

export const useNotificationsStore = create<NotificationsStore>()(
  persist(
    (set) => ({
      allowNotification: false,
      allowMessagesNotification: false,
      allowInteractionsNotification: false,
      allowSystemNotification: false,
      setAllowNotification: (updater: NotificationUpdater) =>
        set((prev) => ({ allowNotification: typeof updater === 'function' ? updater(prev.allowNotification) : updater })),
      setAllowMessagesNotification: (updater: NotificationUpdater) =>
        set((prev) => ({ allowMessagesNotification: typeof updater === 'function' ? updater(prev.allowMessagesNotification) : updater })),
      setAllowInteractionsNotification: (updater: NotificationUpdater) =>
        set((prev) => ({
          allowInteractionsNotification: typeof updater === 'function' ? updater(prev.allowInteractionsNotification) : updater
        })),
      setAllowSystemNotification: (updater: NotificationUpdater) =>
        set((prev) => ({ allowSystemNotification: typeof updater === 'function' ? updater(prev.allowSystemNotification) : updater }))
    }),
    {
      name: 'creator-notifications-store',

      skipHydration: true,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
