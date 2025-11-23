import { graphql } from '../generated';

export const GET_FOLLOWING_QUERY = graphql(`
  query GetFollowing($input: PaginationInput!) {
    getFollowing(input: $input) {
      creatorId
      fanId
      followedAt
      id
      unFollowedAt
      creatorProfile {
        creatorId
        assetCount
        viewCount
        vaultCount
        user {
          avatarUrl
          bannerUrl
          id
          username
        }
      }
    }
  }
`);

export const FOLLOW_CREATOR_MUTATION = graphql(`
  mutation FollowCreator($input: FollowCreatorInput!) {
    followCreator(input: $input) {
      creatorId
      fanId
      followedAt
      id
      unFollowedAt
      creatorProfile {
        creatorId
        user {
          avatarUrl
          bannerUrl
          id
          username
        }
      }
    }
  }
`);

export const UNFOLLOW_CREATOR_MUTATION = graphql(`
  mutation UnFollowCreator($input: UnFollowCreatorInput!) {
    unFollowCreator(input: $input)
  }
`);

export const GET_RESTRICTED_FANS_QUERY = graphql(`
  query GetRestrictedUsers($input: PaginationInput!) {
    getRestrictedUsers(input: $input) {
      creatorId
      fanId
      id
      restrictedAt
      unRestrictedAt
      fanProfile {
        fanId
        user {
          avatarUrl
          firstName
          lastName
          username
        }
      }
    }
  }
`);

export const GET_PUBLIC_CREATOR_PROFILE_QUERY = graphql(`
  query GetPublicCreatorProfile($input: PaginationInput!) {
    getPublicCreatorProfile(input: $input) {
      allowsComment
      allowsMessaging
      bio
      creatorId
      displayOnlineStatus
      displayTotalPost
      displayTotalSubscriber
      themeColor
      totalExclusivePost
      totalPost
      totalPublicPost
      totalSubscriber
      assetCount
      vaultCount
      viewCount
      creatorType
      isFollowing
      user {
        avatarUrl
        bannerUrl
        createdAt
        deletedAt
        firstName
        id
        lastLoginAt
        lastName
        roles
        updatedAt
        username
      }
    }
  }
`);

export const GET_PUBLIC_CREATOR_PROFILE_FOR_ANON_QUERY = graphql(`
  query GetPublicCreatorProfileForAnon($input: PaginationInput!) {
    getPublicCreatorProfileForAnon(input: $input) {
      allowsComment
      allowsMessaging
      bio
      creatorId
      displayOnlineStatus
      displayTotalPost
      displayTotalSubscriber
      themeColor
      totalExclusivePost
      totalPost
      creatorType
      totalPublicPost
      totalSubscriber
      assetCount
      vaultCount
      viewCount
      isFollowing
      user {
        avatarUrl
        bannerUrl
        createdAt
        deletedAt
        firstName
        id
        lastLoginAt
        lastName
        roles
        updatedAt
        username
      }
    }
  }
`);

export const GET_DEFAULT_CREATORS_QUERY = graphql(`
  query GetDefaultCreators($input: PaginationInput!) {
    getDefaultCreators(input: $input) {
      count
      totalPages
      hasNext
      hasPrev
      creators {
        avatarUrl
        bannerUrl
        createdAt
        deletedAt
        firstName
        id
        lastLoginAt
        lastName
        roles
        updatedAt
        username
        creatorProfile {
          totalExclusivePost
          totalPost
          totalPublicPost
          totalSubscriber
          assetCount
          vaultCount
          viewCount
          isFollowing
        }
      }
    }
  }
`);

export const GET_CREATOR_PROFILE_QUERY_BY_ADMIN = graphql(`
  query GetCreatorProfileByAdmin($creatorId: String!) {
    getCreatorProfileByAdmin(creatorId: $creatorId) {
      allowsComment
      allowsMessaging
      bio
      creatorId
      displayOnlineStatus
      displayTotalPost
      displayTotalSubscriber
      themeColor
      totalExclusivePost
      totalPost
      totalPublicPost
      totalSubscriber
      user {
        avatarUrl
        bannerUrl
        createdAt
        deletedAt
        firstName
        id
        lastLoginAt
        lastName
        roles
        updatedAt
        username
      }
    }
  }
`);

export const GET_CREATOR_PROFILE_QUERY = graphql(`
  query GetCreatorProfile {
    getCreatorProfile {
      allowsComment
      allowsMessaging
      bio
      creatorId
      displayOnlineStatus
      displayTotalPost
      displayTotalSubscriber
      themeColor
      totalExclusivePost
      totalPost
      totalPublicPost
      totalSubscriber
      user {
        avatarUrl
        bannerUrl
        createdAt
        deletedAt
        firstName
        id
        lastLoginAt
        lastName
        roles
        updatedAt
        username
      }
    }
  }
`);

export const UPDATE_CREATOR_PROFILE_BY_ADMIN_MUTATION = graphql(`
  mutation UpdateCreatorProfileByAdmin($input: ExtendedUpdateCreatorProfileInput!) {
    updateCreatorProfileByAdmin(input: $input) {
      allowsComment
      allowsMessaging
      bio
      creatorId
      displayOnlineStatus
      displayTotalPost
      displayTotalSubscriber
      themeColor
      totalExclusivePost
      totalPost
      totalPublicPost
      totalSubscriber
      user {
        avatarUrl
        bannerUrl
        username
      }
    }
  }
`);

export const GET_BLOCKED_USERS_QUERY = graphql(`
  query GetBlockedUsers($input: PaginationInput!) {
    getBlockedUsers(input: $input) {
      blockedAt
      creatorId
      fanId
      id
      unBlockedAt
      fanProfile {
        fanId
        user {
          avatarUrl
          firstName
          lastName
          username
        }
      }
    }
  }
`);

export const BLOCK_FAN_MUTATION = graphql(`
  mutation BlockFan($input: BlockFanInput!) {
    blockFan(input: $input)
  }
`);

export const UNBLOCK_FAN_MUTATION = graphql(`
  mutation UnBlockFan($input: BlockFanInput!) {
    blockFan(input: $input)
  }
`);

export const RESTRICT_FAN_MUTATION = graphql(`
  mutation RestrictFan($input: RestrictFanInput!) {
    restrictFan(input: $input)
  }
`);

export const UNRESTRICT_FAN_MUTATION = graphql(`
  mutation UnRestrictFan($input: RestrictFanInput!) {
    restrictFan(input: $input)
  }
`);
