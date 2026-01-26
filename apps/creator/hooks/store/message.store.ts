import { CreatorAssetsEntity, MessagesEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type MessagesStore = {
  content: string;
  openAssets: boolean;
  isExclusive: boolean;
  selectedMessage: MessagesEntity | null;
  messages: MessagesEntity[];
  attachments: Array<CreatorAssetsEntity>;
  unlockAmount: number | null;
  replyMessageId: string | null;
  setContent: (content: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setOpenAssets: (openAssets: boolean) => void;
  setSelectedMessage: (selectedMessage: MessagesEntity | null) => void;
  setIsExclusive: (isExclusive: boolean) => void;
  setAttachments: (attachments: CreatorAssetsEntity[]) => void;
  setMessages: (messages: MessagesEntity[]) => void;
  setUnlockAmount: (unlockAmount: number | null) => void;
  setReplyMessageId: (replyMessageId: string | null) => void;
};

export const useMessagesStore = create<MessagesStore>()((set) => ({
  content: '',
  messages: [],
  isEditing: false,
  isExclusive: false,
  openAssets: false,
  attachments: [],
  unlockAmount: null,
  replyMessageId: null,
  selectedMessage: null,
  setIsEditing: (isEditing) => set({ isEditing }),
  setOpenAssets: (openAssets) => set({ openAssets }),
  setReplyMessageId: (replyMessageId) => set({ replyMessageId }),
  setUnlockAmount: (unlockAmount) => set({ unlockAmount }),
  setIsExclusive: (isExclusive) => set({ isExclusive }),
  setAttachments: (attachments) => set({ attachments }),
  setContent: (content) => set({ content }),
  setSelectedMessage: (selectedMessage: MessagesEntity | null) => set({ selectedMessage }),
  setMessages: (messages: MessagesEntity[]) => set({ messages })
}));
