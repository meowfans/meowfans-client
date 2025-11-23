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
          blurredUrl
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

export const GET_ALL_CREATORS_QUERY = graphql(`
  query GetCreatorsByAdmin($input: PaginationInput!) {
    getCreatorsByAdmin(input: $input) {
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
        fulfilledObjectCount
        pendingObjectCount
        processingObjectCount
        rejectedObjectCount
        creatorProfile {
          vaultCount
          vaultObjectCount
          viewCount
          creatorId
          assetCount
          vaultCount
        }
      }
    }
  }
`);

export const GET_ALL_VAULTS_QUERY = graphql(`
  query GetAllVaultsByAdmin($input: PaginationInput!) {
    getAllVaultsByAdmin(input: $input) {
      count
      vaults {
        createdAt
        deletedAt
        id
        objectUrl
        status
        updatedAt
        vaultId
      }
    }
  }
`);

export const GET_CREATORS_ASSETS_QUERY = graphql(`
  query GetCreatorAssetsByAdmin($input: PaginationInput!) {
    getCreatorAssetsByAdmin(input: $input) {
      assetId
      createdAt
      creatorId
      deletedAt
      id
      type
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
        vaultObject {
          vault {
            keywords
            description
            id
          }
          contentType
          fileType
          id
          status
        }
      }
      creatorProfile {
        creatorId
        bio
        displayOnlineStatus
        user {
          avatarUrl
          id
          username
        }
      }
    }
  }
`);

export const GET_CREATOR_VAULT_OBJECTS_QUERY = graphql(`
  query GetCreatorVaultObjectsByAdmin($input: PaginationInput!) {
    getCreatorVaultObjectsByAdmin(input: $input) {
      count
      vaultObjects {
        createdAt
        deletedAt
        id
        objectUrl
        status
        fileType
        updatedAt
        vaultId
        vault {
          createdAt
          creatorId
          deletedAt
          id
          updatedAt
          url
          creatorProfile {
            creatorId
            user {
              avatarUrl
              id
              username
            }
          }
        }
      }
    }
  }
`);

export const DOWNLOAD_ALL_CREATOR_OBJECTS_MUTATION = graphql(`
  mutation DownloadAllCreatorObjects($input: DownloadAllCreatorObjectsAsBatchInput!) {
    downloadAllCreatorObjects(input: $input)
  }
`);

export const TERMINATE_ALL_DOWNLOADING_MUTATION = graphql(`
  mutation TerminateDownloading {
    terminateDownloading
  }
`);
