import { usePostsStore } from '@/hooks/store/posts.store';
import { usePostsActions } from '@workspace/gql/actions/posts.actions';
import {
  GetPostInput,
  GetPublicPostsOutput,
  GetPublicSinglePostOutput,
  PaginationInput,
  SortBy,
  SortOrder
} from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const usePosts = ({ username, sortBy = SortBy.PostCreatedAt, orderBy = SortOrder.Desc, take = 30, postTypes }: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts } = usePostsStore();
  const { getPublicPostsQuery } = usePostsActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadPosts = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : posts.length;
    setLoading(posts.length === 0);

    try {
      const { data } = await getPublicPostsQuery({
        take,
        skip,
        username,
        orderBy,
        sortBy,
        postTypes
      });

      const fetchedPosts = (data?.getPublicPosts ?? []) as GetPublicPostsOutput[];
      setHasMore(fetchedPosts.length === take);

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

  const handleRefresh = () => {
    setPosts([]);
    loadPosts(true);
  };

  useEffect(() => {
    loadPosts(true);
  }, [username, sortBy, orderBy, take, postTypes]); // eslint-disable-line

  return { posts, loading, hasMore, loadPosts, handleLoadMore, handleRefresh };
};

export const useSinglePost = (input: GetPostInput) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { errorHandler } = useErrorHandler();
  const { getPublicSinglePostQuery } = usePostsActions();
  const { post, setPost } = usePostsStore();

  const loadSinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await getPublicSinglePostQuery(input);
      const fetched = data?.getPublicSinglePost as GetPublicSinglePostOutput;
      setPost(fetched);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSinglePost();
  }, [input.postId]); // eslint-disable-line

  return { post, loading };
};
