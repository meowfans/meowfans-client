import { CreatorAssetsEntity, MessagesEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type MessageUIStore = {
  setSelectedMessage: (selectedMessage: MessagesEntity | null) => void;
  setUnlockAmount: (unlockAmount: number | null) => void;
  attachments: Array<CreatorAssetsEntity>;
  selectedMessage: MessagesEntity | null;
  setContent: (content: string) => void;
  isEditing: boolean;
  content: string;
  openAssets: boolean;
  isExclusive: boolean;
  unlockAmount: number | null;
  replyMessageId: string | null;
  setIsEditing: (isEditing: boolean) => void;
  setOpenAssets: (openAssets: boolean) => void;
  setIsExclusive: (isExclusive: boolean) => void;
  setReplyMessageId: (replyMessageId: string | null) => void;
  setAttachments: (attachments: CreatorAssetsEntity[]) => void;
};

export const useMessageUIStore = create<MessageUIStore>()((set) => ({
  setSelectedMessage: (selectedMessage: MessagesEntity | null) => set({ selectedMessage }),
  setReplyMessageId: (replyMessageId) => set({ replyMessageId }),
  setUnlockAmount: (unlockAmount) => set({ unlockAmount }),
  selectedMessage: null,
  isExclusive: false,
  openAssets: false,
  isEditing: false,
  content: '',
  attachments: [],
  unlockAmount: null,
  replyMessageId: null,
  setContent: (content) => set({ content }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setOpenAssets: (openAssets) => set({ openAssets }),
  setIsExclusive: (isExclusive) => set({ isExclusive }),
  setAttachments: (attachments) => set({ attachments })
}));

type MessageMultiSelectStore = {
  openMultiSelect: boolean;
  deleteMessageIds: string[];
  toggleMessageIds: (deleteMessageId: string) => void;
  setDeleteMessageIds: (deleteMessageIds: string[]) => void;
  setOpenMultiSelect: (openMultiSelect: boolean) => void;
};

export const useMessageMultiSelectStore = create<MessageMultiSelectStore>((set) => ({
  deleteMessageIds: [],
  setDeleteMessageIds: (deleteMessageIds) => set({ deleteMessageIds }),
  openMultiSelect: false,
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
