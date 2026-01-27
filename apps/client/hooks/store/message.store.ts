import { MessageChannelsEntity, MessagesEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type MessagesStore = {
  setSelectedMessage: (selectedMessage: MessagesEntity | null) => void;
  setChannel: (channel: MessageChannelsEntity) => void;
  selectedMessage: MessagesEntity | null;
  setContent: (content: string) => void;
  channel: MessageChannelsEntity;
  deleteMessageIds: string[];
  toggleMessageIds: (deleteMessageId: string) => void;
  isEditing: boolean;
  content: string;
  openMultiSelect: boolean;
  replyMessageId: string | null;
  setIsEditing: (isEditing: boolean) => void;
  setDeleteMessageIds: (deleteMessageIds: string[]) => void;
  setOpenMultiSelect: (openMultiSelect: boolean) => void;
  setReplyMessageId: (replyMessageId: string | null) => void;
};

export const useMessagesStore = create<MessagesStore>()((set) => ({
  setChannel: (channel: MessageChannelsEntity) => set({ channel }),
  setReplyMessageId: (replyMessageId) => set({ replyMessageId }),
  setDeleteMessageIds: (deleteMessageIds) => set({ deleteMessageIds }),
  openMultiSelect: false,
  selectedMessage: null,
  isEditing: false,
  setSelectedMessage: (selectedMessage: MessagesEntity | null) => set({ selectedMessage }),
  content: '',
  deleteMessageIds: [],
  replyMessageId: null,
  channel: {} as MessageChannelsEntity,
  setContent: (content) => set({ content }),
  setIsEditing: (isEditing) => set({ isEditing }),
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
