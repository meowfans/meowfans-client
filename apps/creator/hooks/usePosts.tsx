import { usePostsStore } from '@/hooks/store/posts.store';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { CREATE_POST_MUTATION, GET_POSTS_QUERY } from '@workspace/gql/api/postsAPI';
import { CreatePostInput, PostsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UsePostsProps {
  pageNumber?: number;
  username?: string;
  fanId?: string;
  sortBy?: SortBy;
  orderBy?: SortOrder;
  take?: number;
}

export const usePosts = ({ username, fanId, sortBy = SortBy.PostCreatedAt, orderBy = SortOrder.Asc, take = 30 }: UsePostsProps) => {
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts } = usePostsStore();
  const [getCreatorAssets] = useLazyQuery(GET_POSTS_QUERY);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadPosts = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : posts.length;
    try {
      const { data } = await getCreatorAssets({
        variables: { input: { take, skip, username, orderBy, relatedUserId: fanId, sortBy } }
      });

      const fetchedPosts = (data?.getPosts ?? []) as PostsEntity[];

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

  useEffect(() => {
    loadPosts(true);
  }, []);

  return { posts, handleLoadMore, loading, hasMore };
};

export const useOnPostsUploadMutation = (input: CreatePostInput) => {
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadPosts = async () => {
    if (!input.assetIds.length) return;
    setLoading(true);
    try {
      await createPost({ variables: { input } });
      toast.success('Successfully uploaded posts!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleUploadPosts, loading, setLoading };
};
