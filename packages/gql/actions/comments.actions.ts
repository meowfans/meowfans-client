'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import {
  CREATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  GET_PUBLIC_POST_COMMENTS_BY_POST_ID_QUERY,
  UPDATE_COMMENT_INPUT_MUTATION
} from '@workspace/gql/api';
import { CreateCommentInput, DeleteCommentInput, PaginationInput, UpdateCommentInput } from '@workspace/gql/generated/graphql';

export const useCommentsActions = () => {
  const [createPostComment] = useMutation(CREATE_COMMENT_MUTATION);
  const [deletePostComment] = useMutation(DELETE_COMMENT_MUTATION);
  const [updatePostComment] = useMutation(UPDATE_COMMENT_INPUT_MUTATION);
  const [getPostComments] = useLazyQuery(GET_PUBLIC_POST_COMMENTS_BY_POST_ID_QUERY);

  const publicGetCommentsOfPostQuery = (input: PaginationInput) => {
    return getPostComments({ variables: { input } });
  };

  const createCommentOnAPostMutation = (input: CreateCommentInput) => {
    return createPostComment({ variables: { input } });
  };

  const updateCommentOfAPostMutation = (input: UpdateCommentInput) => {
    return updatePostComment({ variables: { input } });
  };

  const deleteCommentOfAPostMutation = (input: DeleteCommentInput) => {
    return deletePostComment({ variables: { input } });
  };

  return { publicGetCommentsOfPostQuery, createCommentOnAPostMutation, updateCommentOfAPostMutation, deleteCommentOfAPostMutation };
};
