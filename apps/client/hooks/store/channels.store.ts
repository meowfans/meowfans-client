import { MessageChannelsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type ChannelsStore = {
  channels: MessageChannelsEntity[];
  channel: MessageChannelsEntity;
  setChannel: (channel: MessageChannelsEntity) => void;
  setChannels: (channels: MessageChannelsEntity[]) => void;
};

export const useChannelsStore = create<ChannelsStore>()((set) => ({
  channels: [],
  channel: {} as MessageChannelsEntity,
  setChannel: (channel) => set({ channel }),
  setChannels: (channels) => set({ channels })
}));
