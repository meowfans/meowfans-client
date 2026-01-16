'use client';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_POSTS_MUTATION,
  GET_POSTS_INFO_QUERY,
  GET_POSTS_QUERY,
  GET_PUBLIC_POSTS_QUERY,
  GET_SINGLE_POST_QUERY,
  UPDATE_POST_MUTATION
} from '@workspace/gql/api';
import { CreatePostInput, DeletePostInput, DeletePostsInput, PaginationInput, UpdatePostInput } from '@workspace/gql/generated/graphql';

export const usePostsActions = () => {
  const [getPublicPosts] = useLazyQuery(GET_PUBLIC_POSTS_QUERY);
  const [getPosts] = useLazyQuery(GET_POSTS_QUERY);
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  const [deletePosts] = useMutation(DELETE_POSTS_MUTATION);
  const [getPostsInfo] = useLazyQuery(GET_POSTS_INFO_QUERY);
  const [getSinglePost] = useLazyQuery(GET_SINGLE_POST_QUERY);

  const updatePostMutation = (input: UpdatePostInput) => {
    return updatePost({ variables: { input } });
  };

  const getSinglePostQuery = (input: PaginationInput) => {
    return getSinglePost({ variables: { input } });
  };

  const createPostQuery = (input: CreatePostInput) => {
    return createPost({ variables: { input } });
  };

  const deletePostMutation = (input: DeletePostInput) => {
    return deletePost({ variables: { input } });
  };

  const deletePostsMutation = (input: DeletePostsInput) => {
    return deletePosts({ variables: { input } });
  };

  const getPublicPostsQuery = (input: PaginationInput) => {
    return getPublicPosts({ variables: { input } });
  };

  const getPostsInfoQuery = (input: PaginationInput) => {
    return getPostsInfo({ variables: { input } });
  };

  const getPostsQuery = (input: PaginationInput) => {
    return getPosts({ variables: { input } });
  };

  return {
    getPublicPostsQuery,
    updatePostMutation,
    createPostQuery,
    deletePostMutation,
    deletePostsMutation,
    getPostsInfoQuery,
    getPostsQuery,
    getSinglePostQuery
  };
};
