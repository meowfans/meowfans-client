import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type ChannelsStore = {
  channels: ChannelsOutput[];
  channel: ChannelsOutput;
  setChannel: (updater: Updater<ChannelsOutput>) => void;
  setChannels: (updater: Updater<ChannelsOutput[]>) => void;
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
