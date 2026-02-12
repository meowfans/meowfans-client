import { graphql } from '../generated';

export const GET_RECOMMENDED_CREATORS_QUERY = graphql(`
  query GetRecommendedCreators($input: GetRecommendationsInput!) {
    getRecommendedCreators(input: $input) {
      creatorId
      verified
      totalPost
      followersCount
      isFollowing
      user {
        username
        firstName
        lastName
        avatarUrl
      }
    }
  }
`);

export const GET_RECOMMENDED_POSTS_QUERY = graphql(`
  query GetRecommendedPosts($input: GetRecommendationsInput!) {
    getRecommendedPosts(input: $input) {
      id
      preview
      caption
      createdAt
      isLiked
      isPurchased
      creatorProfile {
        user {
          username
          avatarUrl
          firstName
          lastName
        }
      }
    }
  }
`);

export const GET_RECOMMENDED_VAULTS_QUERY = graphql(`
  query GetRecommendedVaults($input: GetRecommendationsInput!) {
    getRecommendedVaults(input: $input) {
      id
      preview
      description
      isPurchased
      unlockPrice
      creatorProfile {
        user {
          username
          avatarUrl
          firstName
          lastName
        }
      }
    }
  }
`);
