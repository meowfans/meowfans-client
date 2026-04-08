import { CreatorAssetsEntity, MessagesOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type MessageUIStore = {
  setSelectedMessage: (updater: Updater<MessagesOutput | null>) => void;
  setUnlockAmount: (updater: Updater<number | null>) => void;
  attachments: Array<CreatorAssetsEntity>;
  selectedMessage: MessagesOutput | null;
  setContent: (updater: Updater<string>) => void;
  isEditing: boolean;
  content: string;
  openAssets: boolean;
  isExclusive: boolean;
  unlockAmount: number | null;
  replyMessageId: string | null;
  setIsEditing: (updater: Updater<boolean>) => void;
  setOpenAssets: (updater: Updater<boolean>) => void;
  setIsExclusive: (updater: Updater<boolean>) => void;
  setReplyMessageId: (updater: Updater<string | null>) => void;
  setAttachments: (updater: Updater<CreatorAssetsEntity[]>) => void;
};

export const useMessageUIStore = create<MessageUIStore>()((set) => ({
  setSelectedMessage: (updater: Updater<MessagesOutput | null>) =>
    set((state) => ({ selectedMessage: typeof updater === 'function' ? updater(state.selectedMessage) : updater })),
  setReplyMessageId: (updater: Updater<string | null>) =>
    set((state) => ({ replyMessageId: typeof updater === 'function' ? updater(state.replyMessageId) : updater })),
  setUnlockAmount: (updater: Updater<number | null>) =>
    set((state) => ({ unlockAmount: typeof updater === 'function' ? updater(state.unlockAmount) : updater })),
  selectedMessage: null,
  isExclusive: false,
  openAssets: false,
  isEditing: false,
  content: '',
  attachments: [],
  unlockAmount: null,
  replyMessageId: null,
  setContent: (updater: Updater<string>) => set((state) => ({ content: typeof updater === 'function' ? updater(state.content) : updater })),
  setIsEditing: (updater: Updater<boolean>) =>
    set((state) => ({ isEditing: typeof updater === 'function' ? updater(state.isEditing) : updater })),
  setOpenAssets: (updater: Updater<boolean>) =>
    set((state) => ({ openAssets: typeof updater === 'function' ? updater(state.openAssets) : updater })),
  setIsExclusive: (updater: Updater<boolean>) =>
    set((state) => ({ isExclusive: typeof updater === 'function' ? updater(state.isExclusive) : updater })),
  setAttachments: (updater: Updater<CreatorAssetsEntity[]>) =>
    set((state) => ({ attachments: typeof updater === 'function' ? updater(state.attachments) : updater }))
}));

type MessageMultiSelectStore = {
  openMultiSelect: boolean;
  deleteMessageIds: string[];
  toggleMessageIds: (deleteMessageId: string) => void;
  setDeleteMessageIds: (updater: Updater<string[]>) => void;
  setOpenMultiSelect: (updater: Updater<boolean>) => void;
};

export const useMessageMultiSelectStore = create<MessageMultiSelectStore>((set) => ({
  deleteMessageIds: [],
  setDeleteMessageIds: (updater: Updater<string[]>) =>
    set((state) => ({ deleteMessageIds: typeof updater === 'function' ? updater(state.deleteMessageIds) : updater })),
  openMultiSelect: false,
  setOpenMultiSelect: (updater: Updater<boolean>) =>
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
