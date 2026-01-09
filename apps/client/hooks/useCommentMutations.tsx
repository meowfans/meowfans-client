'use client';

import { useCommentsStore } from '@/hooks/store/comments.store';
import { useCommentsActions } from '@workspace/gql/actions/comments.actions';
import { PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useState } from 'react';
import { toast } from 'sonner';
import { useFan } from './context/UserContextWrapper';

export const useCommentMutations = () => {
  const { fan } = useFan();
  const { postComments, setPostComments } = useCommentsStore();
  const { createCommentOnAPostMutation, updateCommentOfAPostMutation, deleteCommentOfAPostMutation } = useCommentsActions();
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState(false);

  const createComment = async (postId: string, comment: string) => {
    setLoading(true);
    try {
      const { data } = await createCommentOnAPostMutation({ comment, postId });
      const newComment = data?.createComment as PostCommentsEntity;

      setPostComments([
        {
          ...newComment,
          fanProfile: {
            ...newComment.fanProfile,
            fanId: fan!.fanId,
            user: fan!.user
          }
        },
        ...postComments
      ]);

      toast.success('Commented successfully!');
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (commentId: string, comment: string) => {
    try {
      const { data } = await updateCommentOfAPostMutation({ commentId, comment });
      const updatedComment = data?.updateComment as PostCommentsEntity;

      setPostComments(
        postComments.map((c) => (c.id === commentId ? { ...c, comment: updatedComment.comment, updatedAt: updatedComment.updatedAt } : c))
      );

      toast.success('Successfully updated comment');
    } catch (error) {
      errorHandler({ error });
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await deleteCommentOfAPostMutation({ commentId });
      setPostComments(postComments.filter((c) => c.id !== commentId));
      toast.success('Successfully deleted comment');
    } catch (error) {
      errorHandler({ error });
    }
  };

  return { createComment, updateComment, deleteComment, loading };
};
