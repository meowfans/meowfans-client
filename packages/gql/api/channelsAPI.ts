import { graphql } from '../generated';

export const CREATE_CHANNEL_MUTATION = graphql(`
  mutation CreateChannel($input: CreateChannelInput!) {
    createChannel(input: $input)
  }
`);

export const UPDATE_LAST_SEEN_QUERY = graphql(`
  query UpdateLastSeen($input: UpdateParticipantTimestampInput!) {
    updateLastSeen(input: $input) {
      message
    }
  }
`);

export const UPDATE_CHANNEL_MUTATION = graphql(`
  mutation UpdateChannel($input: UpdateChannelInput!) {
    updateChannel(input: $input) {
      creatorId
      fanId
      id
      isMessagingBlocked
      isMuted
      isPinned
      isRestricted
      label
      lastMessageId
    }
  }
`);

export const UPDATE_CHANNEL_STATUS_MUTATION = graphql(`
  mutation UpdateChannelStatus($input: AcceptChannelRequestInput!) {
    updateChannelStatus(input: $input)
  }
`);

export const GET_CHANNELS_QUERY = graphql(`
  query GetChannels($input: PaginationInput!) {
    getChannels(input: $input) {
      id
      creatorId
      creatorAvatarUrl
      creatorFullname
      creatorLastSeenAt
      isCreatorOnline
      fanId
      fanAvatarUrl
      fanFullname
      fanLastSeenAt
      isFanOnline
      lastMessageId
      isPinned
      label
      isMuted
      isRestricted
      initiatedByUserId
      status
      isFanOnline
      isCreatorOnline
      isMessagingBlocked
      lastMessage {
        channelId
        content
        createdAt
        hasAccess
        id
        isExclusive
        recipientUserId
        senderId
        unlockPrice
        updatedAt
        hasSeen
      }
    }
  }
`);
