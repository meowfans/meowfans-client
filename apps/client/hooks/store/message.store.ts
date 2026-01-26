import { CreatorAssetsEntity, MessageChannelsEntity, MessagesEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type MessagesStore = {
  content: string;
  openAssets: boolean;
  isExclusive: boolean;
  selectedMessage: MessagesEntity | null;
  channel: MessageChannelsEntity;
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
  setChannel: (channel: MessageChannelsEntity) => void;
  setUnlockAmount: (unlockAmount: number | null) => void;
  setReplyMessageId: (replyMessageId: string | null) => void;
};

export const useMessagesStore = create<MessagesStore>()((set) => ({
  content: '',
  channel: {} as MessageChannelsEntity,
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
  setChannel: (channel: MessageChannelsEntity) => set({ channel })
}));
