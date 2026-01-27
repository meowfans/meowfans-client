import { graphql } from '../generated';

export const GET_CHANNEL_MESSAGES_QUERY = graphql(`
  query GetChannelMessages($input: PaginationInput!) {
    getChannelMessages(input: $input) {
      id
      creatorId
      fanId
      isPinned
      label
      isMuted
      isRestricted
      isMessagingBlocked
      totalEarning
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
      messages {
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
        repliedTo {
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
        messageAssets {
          assetId
          asset {
            createdAt
            fileType
            id
            mediaType
            mimeType
            rawUrl
            updatedAt
          }
        }
      }
    }
  }
`);

export const SEND_MESSAGE_FROM_CREATOR_MUTATION = graphql(`
  mutation SendMessageFromCreator($input: SendMessageFromCreatorInput!) {
    sendMessageFromCreator(input: $input) {
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
      messageAssets {
        assetId
        asset {
          createdAt
          fileType
          id
          mediaType
          mimeType
          rawUrl
          updatedAt
        }
      }
    }
  }
`);

export const SEND_MESSAGE_FROM_FAN_MUTATION = graphql(`
  mutation SendMessageFromFan($input: SendMessageFromFanInput!) {
    sendMessageFromFan(input: $input) {
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
  }
`);

export const SEND_REPLY_FROM_CREATOR_MUTATION = graphql(`
  mutation SendReplyFromCreator($input: SendMessageFromCreatorInput!) {
    sendReplyFromCreator(input: $input) {
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
      repliedTo {
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
      messageAssets {
        assetId
        asset {
          createdAt
          fileType
          id
          mediaType
          mimeType
          rawUrl
          updatedAt
        }
      }
    }
  }
`);

export const SEND_REPLY_FROM_FAN_MUTATION = graphql(`
  mutation SendReplyFromFan($input: SendMessageFromFanInput!) {
    sendReplyFromFan(input: $input) {
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
      repliedTo {
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
    }
  }
`);

export const UPDATE_MESSAGE_MUTATION = graphql(`
  mutation UpdateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
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
  }
`);

export const DELETE_MESSAGES_MUTATION = graphql(`
  mutation DeleteMessages($input: DeleteMessagesInput!) {
    deleteMessages(input: $input)
  }
`);

export const DELETE_MESSAGE_MUTATION = graphql(`
  mutation DeleteMessage($input: DeleteMessageInput!) {
    deleteMessage(input: $input)
  }
`);
