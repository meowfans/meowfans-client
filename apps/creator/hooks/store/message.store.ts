import { MessagesEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type MessagesStore = {
  messages: MessagesEntity[];
  message: MessagesEntity;
  setMessage: (message: MessagesEntity) => void;
  setMessages: (messages: MessagesEntity[]) => void;
};

export const useMessagesStore = create<MessagesStore>()((set) => ({
  message: {} as MessagesEntity,
  messages: [],
  setMessage: (message: MessagesEntity) => set({ message }),
  setMessages: (messages: MessagesEntity[]) => set({ messages })
}));
