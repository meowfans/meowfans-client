import { graphql } from '../generated';

export const UPDATE_FAN_PROFILE_MUTATION = graphql(`
  mutation UpdateFanProfile($input: UpdateUserProfileInput!) {
    updateFanProfile(input: $input) {
      appliedAt
      createdAt
      deletedAt
      fanId
      isBanned
      updatedAt
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

export const DELETE_USER_MUTATION = graphql(`
  mutation DeleteUser {
    deleteUser
  }
`);

export const GET_USER_QUERY = graphql(`
  query GetUser($username: String!) {
    getUser(username: $username) {
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
      pendingCount
      rejectedCount
      processingCount
      fulfilledCount
    }
  }
`);

export const UPDATE_ALL_CREATOR_PROFILES_MUTATION = graphql(`
  mutation UpdateAllCreatorProfiles($input: UpdateUsersInput!) {
    updateAllCreatorProfiles(input: $input)
  }
`);