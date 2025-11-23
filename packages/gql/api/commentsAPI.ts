import { graphql } from '../generated';

export const GET_PUBLIC_POST_COMMENTS_BY_POST_ID_QUERY = graphql(`
  query GetPublicPostCommentsByPostId($input: PaginationInput!) {
    getPublicPostCommentsByPostId(input: $input) {
      comment
      createdAt
      deletedAt
      fanId
      id
      postId
      updatedAt
      fanProfile {
        fanId
        user {
          avatarUrl
          username
        }
      }
    }
  }
`);

export const GET_COMMENTS_BY_POST_ID_QUERY = graphql(`
  query GetPostCommentsByPostId($input: PaginationInput!) {
    getPostCommentsByPostId(input: $input) {
      comment
      createdAt
      deletedAt
      fanId
      id
      postId
      updatedAt
      fanProfile {
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

export const GET_ALL_COMMENTS_QUERY = graphql(`
  query GetAllComments($input: PaginationInput!) {
    getAllComments(input: $input) {
      comment
      createdAt
      deletedAt
      fanId
      id
      postId
      updatedAt
      fanProfile {
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
