import { useChannels } from '@/hooks/useChannels';
import { MessageChannelParticipantsEntity } from '@workspace/gql/generated/graphql';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChannelListExpanded } from './ChannelListExpanded';
import { ChannelSelectionDropdown } from './ChannelSelectionDropdown';

export const ChannelList = () => {
  const router = useRouter();
  const [multiSelect, setMultiSelect] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { channels, loading } = useChannels({ take: 30 });

  const toggleSelected = (channelPath: string) => {
    setSelected((prev) => (prev.includes(channelPath) ? prev.filter((p) => p !== channelPath) : [...prev, channelPath]));
  };

  const handleRowClick = (channelPath: string) => {
    if (multiSelect) {
      toggleSelected(channelPath);
      return;
    }
    router.push(`/channels/${channelPath}`);
  };

  const handleSelect = () => {
    setMultiSelect((prev) => {
      if (!prev) setSelected([]);
      return !prev;
    });
  };

  return (
    <div className="space-y-2">
      <ChannelSelectionDropdown
        channels={channels}
        multiSelect={multiSelect}
        onSelect={handleSelect}
        selectedCount={selected.length}
        setSelected={setSelected}
      />
      {loading && <p className="text-sm text-muted-foreground">Loading channels...</p>}
      {channels.map((channel, idx) => {
        const { fanProfile, participants, lastMessage } = channel;
        const fan = participants.find(({ userId }) => userId === fanProfile?.fanId);
        const timestamp = fan ? new Date(Number(fan.lastSeenAt)).getTime() : new Date(0).getTime();
        const hasSeen = timestamp >= Math.max(new Date(lastMessage?.createdAt).getTime(), new Date(lastMessage?.updatedAt).getTime());

        return (
          <ChannelListExpanded
            key={idx}
            channel={channel}
            fanParticipant={fan as MessageChannelParticipantsEntity}
            fanProfile={channel.fanProfile}
            hasSeenLastMessage={hasSeen}
            lastMessage={channel?.lastMessage}
            onRowClick={(id) => handleRowClick(id)}
          />
        );
      })}
    </div>
  );
};
