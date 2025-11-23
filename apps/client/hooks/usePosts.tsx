import { usePostsStore } from '@/hooks/store/posts.store';
import { PostsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { usePostsActions } from './api/posts.actions';
import { useErrorHandler } from './useErrorHandler';

interface UsePostsProps {
  pageNumber?: number;
  username?: string;
  fanId?: string;
  sortBy?: SortBy;
  orderBy?: SortOrder;
  take?: number;
}
export const usePosts = () => {
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts } = usePostsStore();
  const { getPostsQuery } = usePostsActions();

  const getPosts = ({ username, fanId, sortBy = SortBy.PostCreatedAt, orderBy = SortOrder.Desc, take = 30 }: UsePostsProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const loadPosts = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : posts.length;
      try {
        const { data } = await getPostsQuery({
          take,
          skip,
          username,
          orderBy,
          relatedUserId: fanId,
          sortBy
        });

        const fetchedAssets = (data?.getPublicPosts ?? []) as PostsEntity[];
        setHasMore(fetchedAssets.length === take);

        if (initialLoad) setPosts(fetchedAssets);
        else setPosts([...posts, ...fetchedAssets]);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadPosts();
    };

    const handleRefresh = async () => {
      setPosts([]);
      loadPosts(true);
    };

    useEffect(() => {
      loadPosts(true);
    }, []);

    return { posts, handleLoadMore, loading, hasMore, onRefresh: handleRefresh };
  };

  return { getPosts };
};
