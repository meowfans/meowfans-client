import { CreatorAssetsEntity, MessagesEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type MessagesStore = {
  content: string;
  openAssets: boolean;
  isExclusive: boolean;
  message: MessagesEntity;
  messages: MessagesEntity[];
  attachments: Array<CreatorAssetsEntity>;
  unlockAmount: number | null;
  replyMessageId: string | null;
  setContent: (content: string) => void;
  messageOptionsMenu: MessagesEntity | null;
  setOpenAssets: (openAssets: boolean) => void;
  setMessage: (message: MessagesEntity) => void;
  setIsExclusive: (isExclusive: boolean) => void;
  setAttachments: (attachments: CreatorAssetsEntity[]) => void;
  setMessages: (messages: MessagesEntity[]) => void;
  setUnlockAmount: (unlockAmount: number | null) => void;
  setReplyMessageId: (replyMessageId: string | null) => void;
  setMessageOptionsMenu: (messageOptionsMenu: MessagesEntity | null) => void;
};

export const useMessagesStore = create<MessagesStore>()((set) => ({
  content: '',
  messages: [],
  isExclusive: false,
  openAssets: false,
  attachments: [],
  unlockAmount: null,
  replyMessageId: null,
  messageOptionsMenu: null,
  message: {} as MessagesEntity,
  setOpenAssets: (openAssets) => set({ openAssets }),
  setReplyMessageId: (replyMessageId) => set({ replyMessageId }),
  setUnlockAmount: (unlockAmount) => set({ unlockAmount }),
  setIsExclusive: (isExclusive) => set({ isExclusive }),
  setAttachments: (attachments) => set({ attachments }),
  setContent: (content) => set({ content }),
  setMessage: (message: MessagesEntity) => set({ message }),
  setMessages: (messages: MessagesEntity[]) => set({ messages }),
  setMessageOptionsMenu: (messageOptionsMenu) => set({ messageOptionsMenu })
}));
