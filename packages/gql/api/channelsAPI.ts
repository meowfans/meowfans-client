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

export const UPDATE_CHANNEL_MUTATION = graphql(`
  mutation UpdateChannel($input: UpdateChannelInput!) {
    updateChannel(input: $input) {
      createdAt
      creatorId
      deletedAt
      fanId
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

export const GET_CHANNELS_QUERY = graphql(`
  query GetChannels($input: PaginationInput!) {
    getChannels(input: $input) {
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
      lastMessage {
        channelId
        content
        createdAt
        deletedAt
        hasAccess
        id
        isExclusive
        recipientUserId
        senderId
        unlockPrice
        unlockedAt
        updatedAt
      }
      creatorProfile {
        user {
          avatarUrl
          bannerUrl
          firstName
          id
          lastLoginAt
          roles
          username
          lastName
        }
        isFollowing
        creatorId
        bio
        allowsMessaging
      }
      fanProfile {
        fanId
        isBanned
        user {
          avatarUrl
          bannerUrl
          id
          firstName
          lastLoginAt
          lastName
          roles
          username
        }
      }
    }
  }
`);

export const GET_CHANNEL_QUERY = graphql(`
  query GetChannel($input: GetChannelInput!) {
    getChannel(input: $input) {
      createdAt
      creatorId
      deletedAt
      fanId
      id
      isMessagingBlocked
      isMuted
      isPinned
      isRestricted
      label
      totalEarning
      creatorProfile {
        creatorId
        bio
        isFollowing
        user {
          avatarUrl
          bannerUrl
          firstName
          id
          lastLoginAt
          lastName
          roles
          username
        }
      }
      fanProfile {
        fanId
        isBanned
        user {
          avatarUrl
          bannerUrl
          firstName
          id
          lastLoginAt
          lastName
          roles
          username
        }
      }
    }
  }
`);
