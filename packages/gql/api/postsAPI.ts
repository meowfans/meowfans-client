import { graphql } from '../generated';

export const GET_PUBLIC_POSTS_QUERY = graphql(`
  query GetPublicPosts($input: PaginationInput!) {
    getPublicPosts(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      lastCommentId
      likeCount
      saveCount
      shareCount
      preview
      updatedAt
      isLiked
      objectCount
      types
      isPurchased
      unlockPrice
    }
  }
`);

export const GET_PUBLIC_POST_BY_ID_QUERY = graphql(`
  query GetPublicPostById($input: GetPostInput!) {
    getPublicPostById(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      lastCommentId
      likeCount
      saveCount
      shareCount
      preview
      updatedAt
      isLiked
      types
      unlockPrice
      isPurchased
      creatorProfile {
        assetCount
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

export const GET_PUBLIC_POST_BY_ID_FOR_ANON_QUERY = graphql(`
  query GetPublicPostByIdForAnon($input: GetPostInput!) {
    getPublicPostByIdForAnon(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      lastCommentId
      likeCount
      saveCount
      shareCount
      preview
      updatedAt
      isLiked
      isPurchased
      unlockPrice
      creatorProfile {
        assetCount
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

export const GET_PUBLIC_POST_ASSETS_QUERY = graphql(`
  query GetPublicPostAssets($input: PaginationInput!) {
    getPublicPostAssets(input: $input) {
      post {
        caption
        commentCount
        createdAt
        creatorId
        deletedAt
        id
        lastCommentId
        likeCount
        preview
        saveCount
        shareCount
        totalEarning
        types
        unlockPrice
        updatedAt
        isLiked
        creatorProfile {
          assetCount
          creatorId
          user {
            avatarUrl
            bannerUrl
            id
            username
          }
        }
      }
      postAssets {
        asset {
          createdAt
          creatorId
          fileType
          id
          mediaType
          rawUrl
          vaultObjectId
          viewCount
        }
      }
    }
  }
`);

export const CREATE_COMMENT_MUTATION = graphql(`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      comment
      createdAt
      deletedAt
      fanId
      id
      postId
      updatedAt
    }
  }
`);

export const UPDATE_COMMENT_INPUT_MUTATION = graphql(`
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input) {
      comment
      createdAt
      deletedAt
      fanId
      id
      postId
      updatedAt
    }
  }
`);

export const DELETE_COMMENT_MUTATION = graphql(`
  mutation DeleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input)
  }
`);

export const LIKE_POST_MUTATION = graphql(`
  mutation LikePost($input: LikePostInput!) {
    likePost(input: $input) {
      id
      fanId
      createdAt
      postId
      post {
        caption
        commentCount
        createdAt
        creatorId
        deletedAt
        id
        isLiked
        lastCommentId
        likeCount
        preview
        saveCount
        shareCount
        totalEarning
        types
        unlockPrice
        updatedAt
        viewCount
      }
    }
  }
`);

export const SAVE_POST_MUTATION = graphql(`
  mutation SavePost($input: SavePostInput!) {
    savePost(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      likeCount
      saveCount
      shareCount
      totalEarning
      types
      unlockPrice
      updatedAt
    }
  }
`);

export const GET_LIKED_POSTS_QUERY = graphql(`
  query GetLikedPosts($input: PaginationInput!) {
    getLikedPosts(input: $input) {
      createdAt
      fanId
      id
      postId
      post {
        caption
        commentCount
        createdAt
        creatorId
        deletedAt
        id
        isLiked
        lastCommentId
        likeCount
        preview
        saveCount
        shareCount
        totalEarning
        types
        unlockPrice
        updatedAt
        viewCount
      }
    }
  }
`);
