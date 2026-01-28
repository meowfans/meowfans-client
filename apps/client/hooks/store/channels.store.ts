import { MessageChannelsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type ChannelUpdater = MessageChannelsEntity | ((prev: MessageChannelsEntity) => MessageChannelsEntity);

type ChannelsStore = {
  channels: MessageChannelsEntity[];
  channel: MessageChannelsEntity;
  setChannel: (updater: ChannelUpdater) => void;
  setChannels: (channels: MessageChannelsEntity[]) => void;
};

export const useChannelsStore = create<ChannelsStore>()((set) => ({
  channels: [],
  channel: {} as MessageChannelsEntity,

  setChannel: (updater) =>
    set((state) => ({
      channel: typeof updater === 'function' ? (updater as (prev: MessageChannelsEntity) => MessageChannelsEntity)(state.channel) : updater
    })),

  setChannels: (channels) => set({ channels })
}));
