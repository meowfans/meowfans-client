import { graphql } from '../generated';

export const GET_FAN_PROFILE_QUERY = graphql(`
  query getFanProfile {
    getFanProfile {
      fanId
      appliedAt
      hasZoneMembership
      currentZone{
        id
        zoneType
        startedAt
        endsAt
        updatedAt
        fanId
      }
      user {
        firstName
        lastName
        username
        avatarUrl
        bannerUrl
      }
    }
  }
`);

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
