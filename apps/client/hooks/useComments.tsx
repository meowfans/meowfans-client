import { useCommentsStore } from '@/hooks/store/comments.store';
import { PaginationInput, PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useCommentsActions } from './api/comments.actions';
import { useFan } from './context/UserContextWrapper';
import { useErrorHandler } from './useErrorHandler';

export const useComments = () => {
  const { fan } = useFan();
  const { errorHandler } = useErrorHandler();
  const { postComments, setPostComments } = useCommentsStore();
  const { createCommentOnAPostMutation, deleteCommentOfAPostMutation, publicGetCommentsOfPostQuery, updateCommentOfAPostMutation } =
    useCommentsActions();

  const getPostComments = ({ take, relatedEntityId }: PaginationInput) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const loadComments = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : postComments.length;
      try {
        const { data } = await publicGetCommentsOfPostQuery({ skip, take, relatedEntityId });
        const fetchedPostComments = data?.getPublicPostCommentsByPostId as PostCommentsEntity[];

        setHasMore(fetchedPostComments.length === take);

        if (initialLoad) setPostComments(fetchedPostComments);
        else setPostComments([...postComments, ...fetchedPostComments]);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadComments(true);
    };

    const handleRefresh = async () => {
      setPostComments([]);
      loadComments(true);
    };

    useEffect(() => {
      loadComments(true);
    }, []);

    return { onLoadMore: handleLoadMore, loading, setLoading, postComments, hasMore, onRefresh: handleRefresh };
  };

  const createComment = async (postId: string, comment: string) => {
    const [loading, setLoading] = useState<boolean>(false);

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

  const updateComment = async (comment: string, commentId: string) => {
    try {
      const { data } = await updateCommentOfAPostMutation({ commentId, comment });
      const updatedComment = data?.updateComment as PostCommentsEntity;

      setPostComments(
        postComments.map((postComment) => ({
          ...postComment,
          comment: updatedComment.comment,
          updatedAt: updatedComment.updatedAt
        }))
      );

      toast.success('Successfully updated comment');
    } catch (error) {
      errorHandler({ error });
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await deleteCommentOfAPostMutation({ commentId });

      setPostComments(postComments.filter((postComment) => postComment.id !== commentId));
      toast.success('Successfully deleted comment');
    } catch (error) {
      errorHandler({ error });
    }
  };

  return { deleteComment, updateComment, createComment, getPostComments };
};
