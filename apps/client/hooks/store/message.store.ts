import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type MessageInputStore = {
  selectedMessage: MessagesOutput | null;
  isEditing: boolean;
  content: string;
  payableMessage: MessagesOutput | null;
  replyMessageId: string | null;
  setContent: (updater: Updater<string>) => void;
  setIsEditing: (updater: Updater<boolean>) => void;
  setReplyMessageId: (updater: Updater<string | null>) => void;
  setSelectedMessage: (updater: Updater<MessagesOutput | null>) => void;
  setPayableMessage: (updater: Updater<MessagesOutput | null>) => void;
};

export const useMessageInputStore = create<MessageInputStore>()((set) => ({
  setReplyMessageId: (updater) =>
    set((state) => ({ replyMessageId: typeof updater === 'function' ? updater(state.replyMessageId) : updater })),
  selectedMessage: null,
  isEditing: false,
  content: '',
  payableMessage: null,
  replyMessageId: null,
  setContent: (updater) => set((state) => ({ content: typeof updater === 'function' ? updater(state.content) : updater })),
  setIsEditing: (updater) => set((state) => ({ isEditing: typeof updater === 'function' ? updater(state.isEditing) : updater })),
  setSelectedMessage: (updater) =>
    set((state) => ({ selectedMessage: typeof updater === 'function' ? updater(state.selectedMessage) : updater })),
  setPayableMessage: (updater) =>
    set((state) => ({ payableMessage: typeof updater === 'function' ? updater(state.payableMessage) : updater }))
}));

type MessageMultiSelectStore = {
  openMultiSelect: boolean;
  deleteMessageIds: string[];
  setOpenMultiSelect: (updater: Updater<boolean>) => void;
  toggleMessageIds: (deleteMessageId: string) => void;
  setDeleteMessageIds: (updater: Updater<string[]>) => void;
};

export const useMessageMultiSelectStore = create<MessageMultiSelectStore>((set) => ({
  setDeleteMessageIds: (updater) =>
    set((state) => ({ deleteMessageIds: typeof updater === 'function' ? updater(state.deleteMessageIds) : updater })),
  openMultiSelect: false,
  deleteMessageIds: [],
  setOpenMultiSelect: (updater) =>
    set((state) => ({ openMultiSelect: typeof updater === 'function' ? updater(state.openMultiSelect) : updater })),
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
