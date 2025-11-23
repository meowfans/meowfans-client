import { create } from 'zustand';

type WebhookProps = {
  webhook: boolean;
  setWebhook: (webhook: boolean) => void;
};

export const useWebhookStore = create<WebhookProps>()((set) => ({
  webhook: false,
  setWebhook: (webhook) => set(() => ({ webhook }))
}));
