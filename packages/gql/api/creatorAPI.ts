import { graphql } from '../generated';

export const GET_FOLLOWING_QUERY = graphql(`
  query GetFollowing($input: PaginationInput!) {
    getFollowing(input: $input) {
      avatarUrl
      id
      username
    }
  }
`);

export const GET_CREATORS_BY_ADMIN_QUERY = graphql(`
  query GetCreatorsByAdmin($input: PaginationInput!) {
    getCreatorsByAdmin(input: $input) {
      count
      hasNext
      hasPrev
      totalPages
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
          vaultCount
          vaultObjectCount
          viewCount
          creatorId
          assetCount
          vaultCount
          totalPost
          totalExclusivePost
          totalPublicPost
          totalSubscriber
          fulfilledObjectCount
          pendingObjectCount
          processingObjectCount
          rejectedObjectCount
          status
          verification {
            creatorId
            passed
            score
            answers
            createdAt
          }
        }
      }
    }
  }
`);

export const UPDATE_CREATOR_APPROVAL_STATUS_MUTATION = graphql(`
  mutation UpdateCreatorApprovalStatus($input: UpdateCreatorApprovalStatusInput!) {
    updateCreatorApprovalStatus(input: $input)
  }
`);

export const FOLLOW_CREATOR_MUTATION = graphql(`
  mutation FollowCreator($input: FollowCreatorInput!) {
    followCreator(input: $input) {
      id
      avatarUrl
      username
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

export const UPDATE_CREATOR_PROFILE_MUTATION = graphql(`
  mutation UpdateCreatorProfile($input: UpdateCreatorProfileInput!) {
    updateCreatorProfile(input: $input) {
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
      themeColor
    }
  }
`);

export const GET_PUBLIC_CREATOR_PROFILE_QUERY = graphql(`
  query GetPublicCreatorProfile($username: String!) {
    getPublicCreatorProfile(username: $username) {
      creatorId
      bannerUrl
      avatarUrl
      fullName
      username
      bio
      isFollowing
      totalPost
      followersCount
      assetCount
      vaultCount
      isImported
    }
  }
`);

export const GET_DEFAULT_CREATORS_QUERY = graphql(`
  query GetDefaultCreators($input: PaginationInput!) {
    getDefaultCreators(input: $input) {
      id
      avatarUrl
      username
      isFollowing
    }
  }
`);

export const GET_FOLLOWERS_QUERY = graphql(`
  query GetFollowers($input: PaginationInput!) {
    getFollowers(input: $input) {
      creatorId
      fanId
      followedAt
      id
      unFollowedAt
      fanProfile {
        user {
          avatarUrl
          firstName
          lastName
          lastLoginAt
          username
          bannerUrl
        }
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
      followersCount
      assetCount
      viewCount
      status
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

export const SUBMIT_CREATOR_VERIFICATION_DETAILS_MUTATION = graphql(`
  mutation SubmitCreatorVerificationDetails($input: CreatorVerificationInput!) {
    submitCreatorVerificationDetails(input: $input)
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
