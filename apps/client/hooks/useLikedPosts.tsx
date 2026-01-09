import { useFan } from '@/hooks/context/UserContextWrapper';
import { useLikesStore } from '@/hooks/store/likes.store';
import { useLikesActions } from '@workspace/gql/actions/likes.actions';
import { PostLikesEntity, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export function useLikedPosts() {
  const { fan } = useFan();
  const { getLikedPostsQuery } = useLikesActions();
  const { postLikes, setPostLikes } = useLikesStore();
  const { errorHandler } = useErrorHandler();

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadLikes = async (initial = false) => {
    const skip = initial ? 0 : postLikes.length;
    setLoading(postLikes.length === 0);

    try {
      const { data } = await getLikedPostsQuery({
        take: 30,
        skip,
        orderBy: SortOrder.Desc
      });

      const fetched: PostLikesEntity[] = (data?.getLikedPosts ?? []) as PostLikesEntity[];
      setHasMore(fetched.length === 30);

      if (initial) setPostLikes(fetched);
      else setPostLikes([...postLikes, ...fetched]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fan) loadLikes(true);
  }, [fan]);

  const loadMore = () => {
    if (!loading && hasMore) loadLikes(false);
  };

  return {
    postLikes: fan ? postLikes : [],
    loading: fan ? loading : false,
    hasMore: fan ? hasMore : false,
    loadMore
  };
}
