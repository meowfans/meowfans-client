import { graphql } from '../generated';

export const GET_SINGLE_CHANNEL_QUERY = graphql(`
  query GetSingleChannel($input: PaginationInput!) {
    getSingleChannel(input: $input) {
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
      messages {
        id
        content
        senderId
        recipientUserId
        channelId
        unlockPrice
        isExclusive
        hasAccess
        repliedToId
        hasSeen
        unlockedAt
        createdAt
        updatedAt
        repliedTo {
          id
          content
        }
        messageAssets {
          createdAt
          fileType
          id
          mediaType
          rawUrl
        }
      }
    }
  }
`);

export const SEND_MESSAGE_FROM_CREATOR_MUTATION = graphql(`
  mutation SendMessageFromCreator($input: SendMessageFromCreatorInput!) {
    sendMessageFromCreator(input: $input) {
      id
      content
      senderId
      recipientUserId
      channelId
      unlockPrice
      isExclusive
      hasAccess
      repliedToId
      hasSeen
      unlockedAt
      createdAt
      updatedAt
      messageAssets {
        createdAt
        fileType
        id
        mediaType
        rawUrl
      }
    }
  }
`);

export const SEND_MESSAGE_FROM_FAN_MUTATION = graphql(`
  mutation SendMessageFromFan($input: SendMessageFromFanInput!) {
    sendMessageFromFan(input: $input) {
      id
      content
      senderId
      recipientUserId
      channelId
      unlockPrice
      isExclusive
      hasAccess
      repliedToId
      hasSeen
      unlockedAt
      createdAt
      updatedAt
    }
  }
`);

export const SEND_REPLY_FROM_CREATOR_MUTATION = graphql(`
  mutation SendReplyFromCreator($input: SendMessageFromCreatorInput!) {
    sendReplyFromCreator(input: $input) {
      id
      content
      senderId
      recipientUserId
      channelId
      unlockPrice
      isExclusive
      hasAccess
      repliedToId
      hasSeen
      unlockedAt
      createdAt
      updatedAt
      repliedTo {
        id
        content
      }
      messageAssets {
        createdAt
        fileType
        id
        mediaType
        rawUrl
      }
    }
  }
`);

export const SEND_REPLY_FROM_FAN_MUTATION = graphql(`
  mutation SendReplyFromFan($input: SendMessageFromFanInput!) {
    sendReplyFromFan(input: $input) {
      id
      content
      senderId
      recipientUserId
      channelId
      unlockPrice
      isExclusive
      hasAccess
      repliedToId
      hasSeen
      unlockedAt
      createdAt
      updatedAt
      repliedTo {
        id
        content
      }
    }
  }
`);

export const UPDATE_MESSAGE_MUTATION = graphql(`
  mutation UpdateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
      id
      content
      senderId
      recipientUserId
      channelId
      unlockPrice
      isExclusive
      hasAccess
      repliedToId
      hasSeen
      unlockedAt
      createdAt
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
