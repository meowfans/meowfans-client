import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type ChannelUpdater = ChannelsOutput | ((prev: ChannelsOutput) => ChannelsOutput);
type ChannelsUpdater = ChannelsOutput[] | ((prev: ChannelsOutput[]) => ChannelsOutput[]);

type ChannelsStore = {
  channels: ChannelsOutput[];
  channel: ChannelsOutput;
  setChannel: (updater: ChannelUpdater) => void;
  setChannels: (updater: ChannelsUpdater) => void;
};

export const useChannelsStore = create<ChannelsStore>()((set) => ({
  channels: [],
  channel: {} as ChannelsOutput,

  setChannel: (updater) =>
    set((state) => ({
      channel: typeof updater === 'function' ? (updater as (prev: ChannelsOutput) => ChannelsOutput)(state.channel) : updater
    })),

  setChannels: (updater) =>
    set((state) => ({
      channels: typeof updater === 'function' ? (updater as (prev: ChannelsOutput[]) => ChannelsOutput[])(state.channels) : updater
    }))
}));
