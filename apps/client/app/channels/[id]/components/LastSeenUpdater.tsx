import { useFan } from '@/hooks/context/UserContextWrapper';
import { useQuery } from '@apollo/client/react';
import { UPDATE_LAST_SEEN_QUERY } from '@workspace/gql/api';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { useEffect } from 'react';

interface LastSeenUpdaterProps {
  channelId: string;
  channel: ChannelsOutput;
  loading: boolean;
  isRestricted: boolean;
  isBlocked: boolean;
  isRequested: boolean;
}

export const LastSeenUpdater = ({ channelId, channel, loading, isRestricted, isBlocked, isRequested }: LastSeenUpdaterProps) => {
  const { fan } = useFan();

  const { refetch } = useQuery(UPDATE_LAST_SEEN_QUERY, {
    skip: (!channelId && !loading) || isRestricted || isBlocked || isRequested,
    variables: { input: { messageChannelId: channelId } }
  });

  useEffect(() => {
    const lastMessage = (channel.messages || []).at(0);
    if (lastMessage?.recipientUserId === fan?.fanId) {
      refetch({ input: { messageChannelId: channelId, messageId: lastMessage?.id } });
    }
  }, [channel?.messages, channelId, fan]); //eslint-disable-line

  return null;
};
