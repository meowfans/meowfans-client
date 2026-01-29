import { useChannels } from '@/hooks/useChannels';
import { MessageChannelParticipantsEntity } from '@workspace/gql/generated/graphql';
import { normalizePath } from '@workspace/ui/lib/helpers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChannelListExpanded } from './ChannelListExpanded';
import { ChannelSelectionDropdown } from './ChannelSelectionDropdown';

export const ChannelList = () => {
  const router = useRouter();
  const [multiSelect, setMultiSelect] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { channels, loading } = useChannels({ take: 30 });
  const selectedCount = selected.length;

  const toggleSelected = (channelPath: string) => {
    setSelected((prev) => (prev.includes(channelPath) ? prev.filter((p) => p !== channelPath) : [...prev, channelPath]));
  };

  const handleRowClick = (channelPath: string) => {
    if (multiSelect) {
      toggleSelected(channelPath);
      return;
    }
    router.push(normalizePath('channels', channelPath));
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
        selectedCount={selectedCount}
        setSelected={setSelected}
      />
      {loading && <p className="text-sm text-muted-foreground">Loading channels...</p>}
      {channels.map((channel, idx) => {
        const creator = channel.participants.find(({ userId }) => userId === channel?.creatorProfile?.creatorId);
        const timestamp = creator ? new Date(Number(creator.lastSeenAt)).getTime() : new Date(0).getTime();
        const hasSeenLastMessage = timestamp >= new Date(channel?.lastMessage?.createdAt).getTime();

        return (
          <ChannelListExpanded
            key={idx}
            channel={channel}
            creatorParticipant={creator as MessageChannelParticipantsEntity}
            creatorProfile={channel.creatorProfile}
            hasSeenLastMessage={hasSeenLastMessage}
            lastMessage={channel?.lastMessage}
            onRowClick={(id) => handleRowClick(id)}
          />
        );
      })}
    </div>
  );
};
