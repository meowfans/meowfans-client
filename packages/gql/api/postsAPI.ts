import { graphql } from '../generated';

/**
 * Fetches public posts.
 *
 * If a username is provided, posts are filtered to that creator.
 * Used for public profile and discovery pages.
 */
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

/**
 * Fetches a public post and enriches it with fan-specific state.
 *
 * Business rules:
 * - Determines whether the fan has liked the post
 * - Determines whether the fan has purchased the post
 * - @returns blurred preview if the post is not accessible
 */
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

/**
 * Creates a comment on a post.
 *
 * Side effects:
 * - Increments comment count
 */
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

/**
 * Updates a comment owned by the fan.
 */
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

/**
 * Deletes a comment.
 *
 * Side effects:
 * - Decrements comment count
 */
export const DELETE_COMMENT_MUTATION = graphql(`
  mutation DeleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input)
  }
`);

/**
 * Toggles like status for a post.
 *
 * Business rules:
 * - Only purchased (or free) posts can be liked
 *
 * @returns:
 * - PostLikesEntity when liked
 * - null when unLiked or access denied
 */
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

/**
 * Toggles save status for a post
 *
 * Business rules:
 *  - Only fan can save a post
 * @returns the updated post
 */
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

/**
 * @returns posts liked by a fan.
 * Used for liked posts sections.
 */
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

/**
 *  @returns paginated posts belonging to a creator.
 * No visibility or purchase logic is applied.
 */
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
      types
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
          blurredUrl
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

/**
 * Creates a new post with attached assets.
 *
 * Business rules:
 * - Preview asset defaults to the first asset if not specified
 * - Post price is derived from post type
 *
 * Side effects:
 * - Updates creator post counters
 */
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
      types
      unlockPrice
      updatedAt
    }
  }
`);

/**
 * Updates editable post fields.
 * Only fields provided in input are updated.
 */
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
      types
      unlockPrice
      updatedAt
    }
  }
`);

/**
 * Deletes a single post.
 *
 * Side effects:
 * - Updates creator post counters
 */
export const DELETE_POST_MUTATION = graphql(`
  mutation DeletePost($input: DeletePostInput!) {
    deletePost(input: $input)
  }
`);

/**
 * Deletes post in bulk
 *
 * Business logic:
 * - If the post is found and belongs to the creator then the post can be deleted
 * @returns Boolean value
 */
export const DELETE_POSTS_MUTATION = graphql(`
  mutation DeletePosts($input: DeletePostsInput!) {
    deletePosts(input: $input)
  }
`);

/**
 * @returns assets associated with a creator's posts.
 * Creator-only access.
 */
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
        blurredUrl
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
      blurredPreview
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
      types
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
      blurredPreview
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
      types
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
