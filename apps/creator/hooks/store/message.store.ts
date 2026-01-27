import { CreatorAssetsEntity, MessageChannelsEntity, MessagesEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type MessagesStore = {
  setSelectedMessage: (selectedMessage: MessagesEntity | null) => void;
  setUnlockAmount: (unlockAmount: number | null) => void;
  setChannel: (channel: MessageChannelsEntity) => void;
  attachments: Array<CreatorAssetsEntity>;
  selectedMessage: MessagesEntity | null;
  setContent: (content: string) => void;
  channel: MessageChannelsEntity;
  deleteMessageIds: string[];
  toggleMessageIds: (deleteMessageId: string) => void;
  isEditing: boolean;
  content: string;
  openAssets: boolean;
  isExclusive: boolean;
  openMultiSelect: boolean;
  unlockAmount: number | null;
  replyMessageId: string | null;
  setIsEditing: (isEditing: boolean) => void;
  setOpenAssets: (openAssets: boolean) => void;
  setIsExclusive: (isExclusive: boolean) => void;
  setDeleteMessageIds: (deleteMessageIds: string[]) => void;
  setOpenMultiSelect: (openMultiSelect: boolean) => void;
  setReplyMessageId: (replyMessageId: string | null) => void;
  setAttachments: (attachments: CreatorAssetsEntity[]) => void;
};

export const useMessagesStore = create<MessagesStore>()((set) => ({
  setChannel: (channel: MessageChannelsEntity) => set({ channel }),
  setReplyMessageId: (replyMessageId) => set({ replyMessageId }),
  setDeleteMessageIds: (deleteMessageIds) => set({ deleteMessageIds }),
  setUnlockAmount: (unlockAmount) => set({ unlockAmount }),
  openMultiSelect: false,
  selectedMessage: null,
  isExclusive: false,
  openAssets: false,
  isEditing: false,
  setSelectedMessage: (selectedMessage: MessagesEntity | null) => set({ selectedMessage }),
  content: '',
  attachments: [],
  deleteMessageIds: [],
  unlockAmount: null,
  replyMessageId: null,
  channel: {} as MessageChannelsEntity,
  setContent: (content) => set({ content }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setOpenAssets: (openAssets) => set({ openAssets }),
  setIsExclusive: (isExclusive) => set({ isExclusive }),
  setAttachments: (attachments) => set({ attachments }),
  setOpenMultiSelect: (openMultiSelect) => set({ openMultiSelect }),
  toggleMessageIds: (deleteMessageId) =>
    set((state) => {
      const isSelected = state.deleteMessageIds.includes(deleteMessageId);
      return {
        deleteMessageIds: isSelected
          ? state.deleteMessageIds.filter((id) => id !== deleteMessageId)
          : [...state.deleteMessageIds, deleteMessageId]
      };
    })
}));
