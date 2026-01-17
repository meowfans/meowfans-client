import { usePostsStore } from '@/hooks/store/posts.store';
import { usePostsActions } from '@workspace/gql/actions/posts.actions';
import { GetPostInput, PostsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface UsePostsProps {
  username?: string;
  sortBy?: SortBy;
  orderBy?: SortOrder;
  take?: number;
}

export const usePosts = ({ username, sortBy = SortBy.PostCreatedAt, orderBy = SortOrder.Desc, take = 30 }: UsePostsProps = {}) => {
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
        sortBy
      });

      const fetchedPosts = (data?.getPublicPosts ?? []) as PostsEntity[];
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
  }, [username, sortBy, orderBy, take]);

  return { posts, loading, hasMore, loadPosts, handleLoadMore, handleRefresh };
};

export const useSinglePost = (input: GetPostInput) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { errorHandler } = useErrorHandler();
  const { getPublicSinglePostQuery } = usePostsActions();
  const { post, setPost } = usePostsStore();

  const loadSinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await getPublicSinglePostQuery(input);
      const fetched = data?.getPublicSinglePost as PostsEntity;
      setPost(fetched);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSinglePost();
  }, []);

  return { post, loading };
};
