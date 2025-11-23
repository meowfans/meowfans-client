import { useLikesStore } from '@/hooks/store/likes.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import {
  PostLikesEntity,
  SortOrder,
  VaultLikeOutput,
  VaultLikesEntity,
  VaultObjectLikeOutput,
  VaultObjectsLikesEntity
} from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useLikesActions } from './api/likes.actions';
import { useFan } from './context/UserContextWrapper';
import { useErrorHandler } from './useErrorHandler';
import { triggerSparkles } from '@workspace/ui/lib/helpers';

export const useLikes = () => {
  const {
    getLikedPostsQuery,
    getLikedVaultObjectsQuery,
    getLikedVaultsQuery,
    likePostMutation,
    likeVaultMutation,
    likeVaultObjectMutation
  } = useLikesActions();
  const { fan } = useFan();
  const { posts, setPosts } = usePostsStore();
  const { errorHandler } = useErrorHandler();
  const { setVaults, vaults, setVaultObjects, vaultObjects } = useVaultsStore();
  const {
    setVaultLikes,
    vaultLikes,
    appendVaultLikes,
    postLikes,
    setPostLikes,
    setVaultObjectLikes,
    vaultObjectLikes,
    appendVaultObjectLikes
  } = useLikesStore();

  const getLikedVaults = () => {
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const handleLoadMoreVaultLikes = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : vaultLikes.length;
      try {
        const { data } = await getLikedVaultsQuery({
          take: 30,
          skip,
          orderBy: SortOrder.Desc
        });

        const fetchedVaultLikes = data?.getLikedVaults as VaultLikesEntity[];
        setHasMore(fetchedVaultLikes.length === 30);

        if (initialLoad) setVaultLikes(fetchedVaultLikes);
        else appendVaultLikes(fetchedVaultLikes);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) handleLoadMoreVaultLikes();
    };

    useEffect(() => {
      if (fan) handleLoadMoreVaultLikes(true);
    }, [fan]);

    return {
      onLoadMore: handleLoadMore,
      loading: fan ? loading : false,
      hasMore: fan ? hasMore : false,
      vaultLikes: fan ? vaultLikes : [],
      setVaultLikes
    };
  };

  const getLikedPosts = () => {
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const loadPostLikes = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : postLikes.length;
      try {
        const { data } = await getLikedPostsQuery({
          take: 30,
          skip,
          orderBy: SortOrder.Desc
        });

        const fetchedVaultLikes = data?.getLikedPosts as PostLikesEntity[];
        setHasMore(fetchedVaultLikes.length === 30);

        if (initialLoad) setPostLikes(fetchedVaultLikes);
        else setPostLikes([...postLikes, ...fetchedVaultLikes]);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadPostLikes();
    };

    useEffect(() => {
      if (fan) loadPostLikes(true);
    }, [fan]);

    return {
      onLoadMore: handleLoadMore,
      loading: fan ? loading : false,
      hasMore: fan ? hasMore : false,
      postLikes: fan ? postLikes : [],
      setPostLikes
    };
  };

  const likeVault = async (vaultId: string) => {
    if (!vaultId.length) return;

    try {
      const { data } = await likeVaultMutation({ relatedEntityId: vaultId });
      const { isLiked: hasLiked, entity } = data?.likeVault as VaultLikeOutput;
      const newLike = entity as VaultLikesEntity;

      setVaultLikes(hasLiked ? [newLike, ...vaultLikes] : vaultLikes.filter((v) => v.vaultId !== vaultId));

      setVaults(vaults.map((v) => (v.id === vaultId ? { ...v, isLiked: hasLiked } : v)));

      toast[hasLiked ? 'success' : 'info'](hasLiked ? 'The album is saved ❤️' : 'The album is removed 💔');
      return hasLiked;
    } catch (error) {
      errorHandler({ error });
    }
  };

  const likeVaultObject = async (vaultObjectId: string) => {
    if (!vaultObjectId.length) return;
    try {
      const { data } = await likeVaultObjectMutation({ relatedEntityId: vaultObjectId });
      const { isLiked: hasLiked, entity } = data?.likeVaultObject as VaultObjectLikeOutput;
      const newLike = entity as VaultObjectsLikesEntity;

      setVaultObjectLikes(hasLiked ? [newLike, ...vaultObjectLikes] : vaultObjectLikes.filter((v) => v.vaultObjectId !== vaultObjectId));
      setVaultObjects(vaultObjects.map((vo) => (vo.id === vaultObjectId ? { ...vo, isLiked: hasLiked } : vo)));

      toast[hasLiked ? 'success' : 'info'](hasLiked ? 'Post is saved ❤️' : 'Post is removed 💔');
      return hasLiked;
    } catch (error) {
      errorHandler({ error });
    }
  };

  const getLikedVaultObjects = () => {
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const handleLoadMoreVaultObjectLikes = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : vaultObjectLikes.length;
      try {
        const { data } = await getLikedVaultObjectsQuery({
          take: 30,
          skip,
          orderBy: SortOrder.Desc
        });

        const fetchedVaultObjectLikes = data?.getLikedVaultObjects as VaultObjectsLikesEntity[];
        setHasMore(fetchedVaultObjectLikes.length === 30);

        if (initialLoad) setVaultObjectLikes(fetchedVaultObjectLikes);
        else appendVaultObjectLikes(fetchedVaultObjectLikes);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) handleLoadMoreVaultObjectLikes();
    };

    useEffect(() => {
      if (fan) handleLoadMoreVaultObjectLikes(true);
    }, [fan]);

    return {
      onLoadMore: handleLoadMore,
      loading: fan ? loading : false,
      hasMore: fan ? loading : false,
      vaultObjectLikes: fan ? vaultObjectLikes : [],
      setVaultObjectLikes
    };
  };

  const likePost = async (postId: string) => {
    if (!postId.length) return;
    try {
      const { data } = await likePostMutation({ postId });
      const newLikedPost = data?.likePost as PostLikesEntity | null;
      const hasLiked = newLikedPost !== null;

      setPostLikes(hasLiked ? [newLikedPost, ...postLikes] : postLikes.filter((v) => v.postId !== postId));
      setPosts(posts.map((post) => (post.id === postId ? { ...post, isLiked: hasLiked } : post)));

      toast[hasLiked ? 'success' : 'info'](hasLiked ? 'Post is saved ❤️' : 'Post is removed 💔');
      triggerSparkles();
      return hasLiked;
    } catch (error) {
      errorHandler({ error });
    }
  };

  return { getLikedVaults, getLikedPosts, likeVault, likeVaultObject, getLikedVaultObjects, likePost };
};
