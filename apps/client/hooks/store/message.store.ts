import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type MessageInputStore = {
  selectedMessage: MessagesOutput | null;
  isEditing: boolean;
  content: string;
  replyMessageId: string | null;
  setContent: (content: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  setReplyMessageId: (replyMessageId: string | null) => void;
  setSelectedMessage: (selectedMessage: MessagesOutput | null) => void;
};

export const useMessageInputStore = create<MessageInputStore>()((set) => ({
  setReplyMessageId: (replyMessageId) => set({ replyMessageId }),
  selectedMessage: null,
  isEditing: false,
  setSelectedMessage: (selectedMessage: MessagesOutput | null) => set({ selectedMessage }),
  content: '',
  replyMessageId: null,
  setContent: (content) => set({ content }),
  setIsEditing: (isEditing) => set({ isEditing })
}));

type MessageMultiSelectStore = {
  openMultiSelect: boolean;
  deleteMessageIds: string[];
  setOpenMultiSelect: (openMultiSelect: boolean) => void;
  toggleMessageIds: (deleteMessageId: string) => void;
  setDeleteMessageIds: (deleteMessageIds: string[]) => void;
};

export const useMessageMultiSelectStore = create<MessageMultiSelectStore>((set) => ({
  setDeleteMessageIds: (deleteMessageIds) => set({ deleteMessageIds }),
  openMultiSelect: false,
  deleteMessageIds: [],
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
