import { usePostsStore } from '@/hooks/store/posts.store';
import { usePostsActions } from '@workspace/gql/actions';
import {
  CreatePostInput,
  DeletePostInput,
  DeletePostsInput,
  PaginationInput,
  PostsEntity,
  PostStatAnalyticsOutput,
  PostStatsInput,
  UpdatePostInput
} from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useEffect, useState } from 'react';

/**
 * This hook is designed to fetch paginated posts belonging to a creator.
 * No visibility or purchase logic is applied.
 */
export const usePosts = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts } = usePostsStore();
  const { getPostsQuery } = usePostsActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadPosts = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : posts.length;
    setLoading(posts.length === 0);
    try {
      const { data } = await getPostsQuery({ ...params, skip });

      const fetchedPosts = (data?.getPosts ?? []) as PostsEntity[];

      setHasMore(fetchedPosts.length === params.take);

      if (initialLoad) setPosts(fetchedPosts);
      else setPosts([...posts, ...fetchedPosts]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadPosts();
  };

  useEffect(() => {
    loadPosts(true);
  }, [params.sortBy, params.orderBy]); //eslint-disable-line

  return { posts, handleLoadMore, loading, hasMore };
};

/**
 * This hook is designed to create a new post with attached assets.
 *
 * Business rules:
 * - Preview asset defaults to the first asset if not specified
 * - Post price is derived from post type
 *
 */
export const useOnPostsUploadMutation = () => {
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts } = usePostsStore();
  const { createPostQuery } = usePostsActions();
  const { successHandler } = useSuccessHandler();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadPosts = async (input: CreatePostInput) => {
    if (!input.assetIds.length) return;
    setLoading(true);
    try {
      const { data } = await createPostQuery(input);
      const newPost = data?.createPost as PostsEntity;
      if (newPost) {
        setPosts([newPost, ...posts]);
        successHandler({ message: 'Successfully uploaded posts!', isEnabledConfetti: true });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { handleUploadPosts, loading, setLoading };
};

/**
 * This hook is designed to update editable post fields.
 * Only fields provided in input are updated.
 */
export const useUpdatePost = () => {
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts } = usePostsStore();
  const { updatePostMutation } = usePostsActions();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdatePost = async (input: UpdatePostInput) => {
    setLoading(true);

    try {
      const { data } = await updatePostMutation(input);
      const updatedPost = data?.updatePost as PostsEntity;
      setPosts(posts.map((post) => (post.id === updatedPost.id ? { ...post, ...updatedPost } : post)));
      successHandler({ message: 'Successfully updated the post' });
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleUpdatePost };
};

/**
 * This hook is designed deletes a single post.
 */
export const useDeletePost = () => {
  const { deletePostMutation } = usePostsActions();
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts } = usePostsStore();
  const { successHandler } = useSuccessHandler();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeletePost = async (input: DeletePostInput) => {
    setLoading(true);

    try {
      const { data } = await deletePostMutation(input);
      if (data?.deletePost) {
        setPosts(posts.filter((post) => post.id !== input.postId));
        successHandler({ message: 'Deleted post successfully' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };
  return { handleDeletePost, loading };
};

/**
 * This hook is designed to delete posts in bulk
 *
 * Business logic:
 * - If the post is found and belongs to the creator then the post can be deleted
 */
export const useBulkDeletePosts = () => {
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts } = usePostsStore();
  const { successHandler } = useSuccessHandler();
  const { deletePostsMutation } = usePostsActions();
  const [loading, setLoading] = useState<boolean>(false);

  const handleBulkDeletePosts = async (input: DeletePostsInput) => {
    setLoading(true);

    try {
      const { data } = await deletePostsMutation(input);
      if (data?.deletePosts) {
        setPosts(posts.filter((post) => !input.postIds.includes(post.id)));
        successHandler({ message: 'Deleted posts successfully' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { handleBulkDeletePosts, loading };
};

interface SinglePostHookProps {
  postId: string;
}

export const useSinglePost = ({ postId }: SinglePostHookProps) => {
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(false);
  const { post, setPost } = usePostsStore();
  const { getSinglePostQuery } = usePostsActions();

  const loadSinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await getSinglePostQuery({ relatedEntityId: postId });
      const fetched = data?.getSinglePost as PostsEntity;
      setPost(fetched);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSinglePost();
  }, []); //eslint-disable-line

  return { post, loading };
};

export const usePostsAnalytics = (input: PostStatsInput) => {
  const { postsAnalytics, setPostsAnalytics } = usePostsStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { getPostAnalyticsQuery } = usePostsActions();
  const { errorHandler } = useErrorHandler();

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await getPostAnalyticsQuery(input);
      const fetched = data?.getPostAnalytics as PostStatAnalyticsOutput[];
      setPostsAnalytics(fetched);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []); //eslint-disable-line

  return { postsAnalytics, loading };
};
