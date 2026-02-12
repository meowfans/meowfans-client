import { graphql } from '../generated';

export const GET_PUBLIC_POSTS_QUERY = graphql(`
  query GetPublicPosts($input: PaginationInput!) {
    getPublicPosts(input: $input) {
      id
      preview
      caption
      createdAt
      isLiked
      objectCount
      isPurchased
      unlockPrice
      creatorAvatarUrl
      creatorFullname
      creatorUsername
      creatorId
    }
  }
`);

export const GET_PUBLIC_CREATOR_POSTS_QUERY = graphql(`
  query GetPublicCreatorPosts($input: PaginationInput!) {
    getPublicCreatorPosts(input: $input) {
      id
      preview
      caption
      createdAt
      isLiked
      objectCount
      isPurchased
      unlockPrice
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
      isLiked
      preview
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
      type
      unlockPrice
      updatedAt
    }
  }
`);

export const GET_LIKED_POSTS_QUERY = graphql(`
  query GetLikedPosts($input: PaginationInput!) {
    getLikedPosts(input: $input) {
      id
      isLiked
      preview
      fileType
    }
  }
`);

export const GET_POSTS_QUERY = graphql(`
  query GetPosts($input: PaginationInput!) {
    getPosts(input: $input) {
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
      totalEarning
      viewCount
      type
      preview
      unlockPrice
      updatedAt
      latestComment {
        comment
        createdAt
        deletedAt
        fanId
        id
        postId
        updatedAt
      }
      postAssets {
        id
        deletedAt
        assetId
        createdAt
        asset {
          createdAt
          creatorId
          fileType
          id
          mediaType
          mimeType
          rawUrl
          updatedAt
          vaultObjectId
          viewCount
        }
      }
    }
  }
`);

export const CREATE_POST_MUTATION = graphql(`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
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
      totalEarning
      type
      unlockPrice
      updatedAt
    }
  }
`);

export const UPDATE_POST_MUTATION = graphql(`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
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
      type
      unlockPrice
      updatedAt
    }
  }
`);

export const DELETE_POST_MUTATION = graphql(`
  mutation DeletePost($input: DeletePostInput!) {
    deletePost(input: $input)
  }
`);

export const DELETE_POSTS_MUTATION = graphql(`
  mutation DeletePosts($input: DeletePostsInput!) {
    deletePosts(input: $input)
  }
`);

export const GET_POST_ASSETS_QUERY = graphql(`
  query GetPostAssets($input: PaginationInput!) {
    getPostAssets(input: $input) {
      assetId
      createdAt
      deletedAt
      id
      postId
      updatedAt
      asset {
        createdAt
        creatorId
        fileType
        id
        mediaType
        mimeType
        rawUrl
        updatedAt
        vaultObjectId
        viewCount
      }
    }
  }
`);

export const GET_SINGLE_POST_QUERY = graphql(`
  query GetSinglePost($input: PaginationInput!) {
    getSinglePost(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      isLiked
      isPurchased
      lastCommentId
      likeCount
      objectCount
      preview
      saveCount
      shareCount
      totalEarning
      type
      unlockPrice
      updatedAt
      viewCount
      postAssets {
        assetId
        asset {
          isPosted
          mediaType
          mimeType
          rawUrl
          viewCount
          updatedAt
          id
          fileType
          createdAt
        }
      }
      latestComment {
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
            lastName
            firstName
            username
          }
        }
      }
    }
  }
`);

export const GET_PUBLIC_SINGLE_POST_QUERY = graphql(`
  query GetPublicSinglePost($input: GetPostInput!) {
    getPublicSinglePost(input: $input) {
      id
      preview
      caption
      createdAt
      isPurchased
      isLiked
      unlockPrice
      objectCount
      creatorId
      isSaved
      likeCount
      viewCount
      saveCount
      shareCount
      commentCount
      creatorAvatarUrl
      creatorFullname
      creatorUsername
      postType
      postAssets {
        assetId
        rawUrl
        fileType
      }
    }
  }
`);

export const GET_POSTS_ANALYTICS_QUERY = graphql(`
  query GetPostAnalytics($input: PostStatsInput!) {
    getPostAnalytics(input: $input) {
      commentCount
      timestamp
      id
      likeCount
      saveCount
      shareCount
      totalEarning
      unlockPrice
      viewCount
    }
  }
`);
