import { graphql } from '../generated';

export const GET_PUBLIC_SINGLE_VAULT_QUERY = graphql(`
  query GetPublicSingleVault($input: PaginationInput!) {
    getPublicSingleVault(input: $input) {
      createdAt
      creatorId
      deletedAt
      description
      id
      keywords
      preview
      updatedAt
      isLiked
      likeCount
      isPurchased
      unlockPrice
      objectCount
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
      vaultObjects {
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
        }
        id
        unlockPrice
        isPurchased
        contentType
        fileType
        status
        vaultId
        isLiked
        likeCount
      }
    }
  }
`);

export const GET_CREATOR_VAULTS_QUERY = graphql(`
  query GetCreatorVaults($input: PaginationInput!) {
    getCreatorVaults(input: $input) {
      createdAt
      creatorId
      deletedAt
      description
      id
      keywords
      preview
      updatedAt
      isLiked
      likeCount
      isPurchased
      unlockPrice
      objectCount
    }
  }
`);

export const GET_VAULTS_ANALYTICS_QUERY = graphql(`
  query GetVaultsAnalytics($input: VaultStatsInput!) {
    getVaultsAnalytics(input: $input) {
      timestamp
      id
      likeCount
      totalEarning
      unlockPrice
      viewCount
    }
  }
`);

export const GET_LIKED_VAULTS_QUERY = graphql(`
  query GetLikedVaults($input: PaginationInput!) {
    getLikedVaults(input: $input) {
      createdAt
      fanId
      id
      vaultId
      vault {
        createdAt
        creatorId
        deletedAt
        description
        id
        keywords
        likeCount
        preview
        updatedAt
        viewCount
        isLiked
        isPurchased
      }
    }
  }
`);

export const LIKE_VAULT_OBJECT_MUTATION = graphql(`
  mutation LikeVaultObject($input: PaginationInput!) {
    likeVaultObject(input: $input) {
      entity {
        createdAt
        fanId
        id
        vaultObjectId
        vaultObject {
          contentType
          createdAt
          deletedAt
          fileType
          id
          importedAt
          likeCount
          status
          suffix
          updatedAt
          vaultId
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
      isLiked
    }
  }
`);

export const LIKE_VAULT_MUTATION = graphql(`
  mutation LikeVault($input: PaginationInput!) {
    likeVault(input: $input) {
      isLiked
      entity {
        createdAt
        fanId
        id
        vaultId
        vault {
          createdAt
          creatorId
          deletedAt
          description
          id
          keywords
          likeCount
          preview
          updatedAt
          viewCount
        }
      }
    }
  }
`);

export const GET_LIKED_VAULT_OBJECTS_QUERY = graphql(`
  query GetLikedVaultObjects($input: PaginationInput!) {
    getLikedVaultObjects(input: $input) {
      createdAt
      fanId
      id
      vaultObjectId
      vaultObject {
        contentType
        fileType
        id
        status
        isLiked
        likeCount
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

export const GET_CREATOR_VAULT_OBJECTS_QUERY = graphql(`
  query GetCreatorVaultObjectsByAdmin($input: PaginationInput!) {
    getCreatorVaultObjectsByAdmin(input: $input) {
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
`);

export const GET_PUBLIC_VAULTS_QUERY = graphql(`
  query GetPublicVaults($input: PaginationInput!) {
    getPublicVaults(input: $input) {
      creatorId
      description
      id
      keywords
      isLiked
      likeCount
      createdAt
      preview
      objectCount
      isPurchased
      unlockPrice
      creatorProfile {
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

export const GET_PUBLIC_VAULT_OBJECTS_QUERY = graphql(`
  query GetPublicVaultObjects($input: PaginationInput!) {
    getPublicVaultObjects(input: $input) {
      contentType
      createdAt
      deletedAt
      fileType
      id
      importedAt
      likeCount
      objectUrl
      status
      suffix
      updatedAt
      vaultId
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

export const DOWNLOAD_CREATOR_OBJECTS_AS_BATCH_MUTATION = graphql(`
  mutation DownloadCreatorObjectsAsBatch($input: UploadVaultQueueInput!) {
    downloadCreatorObjectsAsBatch(input: $input)
  }
`);

export const TERMINATE_ALL_JOBS_MUTATION = graphql(`
  mutation Terminate {
    terminate
  }
`);

export const GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY = graphql(`
  query GetTotalObjectsAsType($input: PaginationInput!) {
    getTotalObjectsAsType(input: $input)
  }
`);

export const CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION = graphql(`
  mutation CleanUpVaultObjectsOfACreator($input: CleanUpVaultInput!) {
    cleanUpVaultObjectsOfACreator(input: $input)
  }
`);

export const GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE_QUERY = graphql(`
  query GetCountOfObjectsOfEachType {
    getCountOfObjectsOfEachType {
      fulfilled
      pending
      processing
      rejected
    }
  }
`);

export const UPDATE_PREVIEW_OF_VAULTS_QUERY = graphql(`
  mutation UpdatePreviewOfDefaultVaults {
    updatePreviewOfVaults
  }
`);
