import { graphql } from '../generated';

export const GET_ALL_ASSETS_QUERY = graphql(`
  query GetAllAssetsByAdmin($input: PaginationInput!) {
    getAllAssetsByAdmin(input: $input) {
      count
      assets {
        assetId
        createdAt
        creatorId
        deletedAt
        id
        type
        asset {
          createdAt
          fileType
          id
          mediaType
          mimeType
          rawUrl
          updatedAt
        }
        creatorProfile {
          createdAt
          creatorId
          verified
          user {
            avatarUrl
            id
            lastLoginAt
            roles
            username
          }
        }
      }
    }
  }
`);

export const GET_CREATOR_ASSETS_QUERY = graphql(`
  query GetCreatorAssets($input: PaginationInput!) {
    getCreatorAssets(input: $input) {
      assetId
      createdAt
      creatorId
      deletedAt
      id
      type
      asset {
        createdAt
        creatorId
        fileType
        id
        mediaType
        mimeType
        rawUrl
        updatedAt
        isPosted
      }
    }
  }
`);

export const GET_PUBLIC_SHORTS_ASSETS_QUERY = graphql(`
  query GetPublicShortsAssets($input: PaginationInput!) {
    getPublicShortsAssets(input: $input) {
      createdAt
      creatorId
      fileType
      id
      mediaType
      mimeType
      rawUrl
      updatedAt
      vaultObjectId
      creatorProfile {
        creatorId
        user {
          id
          username
          avatarUrl
          bannerUrl
        }
      }
      vaultObject {
        id
        isLiked
        vault {
          id
          description
        }
      }
    }
  }
`);

export const GET_PUBLIC_ASSETS = graphql(`
  query GetPublicAssets($input: PaginationInput!) {
    getPublicAssets(input: $input) {
      assetId
      createdAt
      creatorId
      deletedAt
      id
      type
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
      }
      creatorProfile {
        bio
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

export const GET_FAN_ASSETS_QUERY = graphql(`
  query GetFanAssets($input: PaginationInput!) {
    getFanAssets(input: $input) {
      assetId
      createdAt
      deletedAt
      fanId
      id
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

export const GET_PUBLIC_CREATOR_ASSETS_QUERY = graphql(`
  query GetPublicCreatorAssets($input: PaginationInput!) {
    getPublicCreatorAssets(input: $input) {
      assetId
      createdAt
      creatorId
      deletedAt
      id
      type
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
        vaultObject {
          isLiked
          likeCount
          contentType
          id
          isPurchased
          vault {
            description
            id
            isPurchased
            isLiked
            keywords
            likeCount
            preview
          }
        }
      }
    }
  }
`);

export const DELETE_CREATOR_ASSETS_MUTATION = graphql(`
  mutation DeleteCreatorAssets($input: DeleteCreatorAsset!) {
    deleteCreatorAssets(input: $input)
  }
`);

export const DELETE_ALL_ASSETS_MUTATION = graphql(`
  mutation DeleteAllAssets {
    deleteAllAssets
  }
`);

export const UPDATE_ASSETS_MUTATION = graphql(`
  mutation UpdateAssets($input: UpdateAssetsInput!) {
    updateAssets(input: $input) {
      assetId
      createdAt
      creatorId
      deletedAt
      id
      type
      asset {
        createdAt
        creatorId
        fileType
        id
        mediaType
        mimeType
        rawUrl
        updatedAt
      }
    }
  }
`);
