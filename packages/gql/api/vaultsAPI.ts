import { graphql } from '../generated';

export const GET_PUBLIC_SINGLE_VAULT_QUERY = graphql(`
  query GetPublicSingleVault($input: PaginationInput!) {
    getPublicSingleVault(input: $input) {
      id
      preview
      objectCount
      isLiked
      isPurchased
      description
      unlockPrice
      creatorId
      username
      avatarUrl
      keywords
      createdAt
      updatedAt
      vaultObjects {
        id
        rawUrl
        creatorId
        isPurchased
        isLiked
        unlockPrice
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
      id
      preview
      isLiked
    }
  }
`);

export const LIKE_VAULT_OBJECT_MUTATION = graphql(`
  mutation LikeVaultObject($input: PaginationInput!) {
    likeVaultObject(input: $input) {
      id
      isLiked
      preview
    }
  }
`);

export const LIKE_VAULT_MUTATION = graphql(`
  mutation LikeVault($input: PaginationInput!) {
    likeVault(input: $input) {
      isLiked
      id
      preview
    }
  }
`);

export const GET_LIKED_VAULT_OBJECTS_QUERY = graphql(`
  query GetLikedVaultObjects($input: PaginationInput!) {
    getLikedVaultObjects(input: $input) {
      id
      isLiked
      preview
      vaultId
      fileType
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
      id
      preview
      objectCount
      isLiked
      isPurchased
      description
      unlockPrice
    }
  }
`);

export const GET_PUBLIC_CREATOR_VAULTS_QUERY = graphql(`
  query GetPublicCreatorVaults($input: PaginationInput!) {
    getPublicCreatorVaults(input: $input) {
      id
      preview
      objectCount
      isLiked
      isPurchased
      description
      unlockPrice
    }
  }
`);

export const GET_PUBLIC_VAULTS_BY_TAGS_QUERY = graphql(`
  query GetPublicVaultsByTags($input: PaginationInput!) {
    getPublicVaultsByTags(input: $input) {
      id
      preview
      objectCount
      isLiked
      isPurchased
      description
      unlockPrice
    }
  }
`);

export const GET_PUBLIC_VAULT_OBJECTS_QUERY = graphql(`
  query GetPublicVaultObjects($input: PaginationInput!) {
    getPublicVaultObjects(input: $input) {
      id
      rawUrl
      creatorId
      isPurchased
      isLiked
      unlockPrice
      vaultId
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
    cleanUpVaultObjectsOfACreator(input: $input) {
      affected
      rejectedObjectCount
      pendingObjectCount
      processingObjectCount
      fulfilledObjectCount
    }
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
