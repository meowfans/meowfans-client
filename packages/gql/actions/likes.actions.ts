'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import {
  GET_LIKED_POSTS_QUERY,
  GET_LIKED_VAULT_OBJECTS_QUERY,
  GET_LIKED_VAULTS_QUERY,
  LIKE_POST_MUTATION,
  LIKE_VAULT_MUTATION,
  LIKE_VAULT_OBJECT_MUTATION
} from '@workspace/gql/api';
import { LikePostInput, PaginationInput } from '@workspace/gql/generated/graphql';

export const useLikesActions = () => {
  const [likeAPost] = useMutation(LIKE_POST_MUTATION);
  const [likeAVault] = useMutation(LIKE_VAULT_MUTATION);
  const [getPostLikes] = useLazyQuery(GET_LIKED_POSTS_QUERY);
  const [getVaultLikes] = useLazyQuery(GET_LIKED_VAULTS_QUERY);
  const [likeVaultObject] = useMutation(LIKE_VAULT_OBJECT_MUTATION);
  const [getVaultObjectLikes] = useLazyQuery(GET_LIKED_VAULT_OBJECTS_QUERY);

  const getLikedVaultsQuery = (input: PaginationInput) => {
    return getVaultLikes({ variables: { input } });
  };

  const getLikedPostsQuery = (input: PaginationInput) => {
    return getPostLikes({ variables: { input } });
  };

  const likeVaultMutation = (input: PaginationInput) => {
    return likeAVault({ variables: { input } });
  };

  const likeVaultObjectMutation = (input: PaginationInput) => {
    return likeVaultObject({ variables: { input } });
  };

  const getLikedVaultObjectsQuery = (input: PaginationInput) => {
    return getVaultObjectLikes({ variables: { input } });
  };

  const likePostMutation = (input: LikePostInput) => {
    return likeAPost({ variables: { input } });
  };

  return {
    likePostMutation,
    getLikedPostsQuery,
    getLikedVaultObjectsQuery,
    getLikedVaultsQuery,
    likeVaultMutation,
    likeVaultObjectMutation
  };
};
