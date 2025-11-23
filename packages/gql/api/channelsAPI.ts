import { graphql } from '../generated';

export const CREATE_CHANNEL_MUTATION = graphql(`
  mutation CreateChannel($input: CreateChannelInput!) {
    createChannel(input: $input) {
      createdAt
      deletedAt
      id
      isMessagingBlocked
      isMuted
      isPinned
      isRestricted
      label
      lastMessageId
      totalEarning
    }
  }
`);
