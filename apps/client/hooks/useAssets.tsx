import { useAssetsStore } from '@/hooks/store/assets.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { AssetsEntity, CreatorAssetsEntity, FanAssetsEntity, PostAssetsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { useAssetsActions } from './api/assets.actions';
import { useFan } from './context/UserContextWrapper';
import { useErrorHandler } from './useErrorHandler';

interface UseAssetsProps {
  pageNumber?: number;
  username?: string;
  fanId?: string;
  sortBy?: SortBy;
  orderBy?: SortOrder;
  take?: number;
  postId?: string;
}

export const useAssets = () => {
  const { fan } = useFan();
  const { errorHandler } = useErrorHandler();
  const { assets, setAssets } = useAssetsStore();
  const { fanAssets, setFanAssets, setPublicShorts, publicShorts } = useAssetsStore();
  const { postAssets, setPostAssets } = usePostsStore();
  const { privateGetFanAssetsQuery, publicGetPostAssetsQuery, publicGetVaultAssetsQuery, publicGetShortsQuery } = useAssetsActions();

  // The assets which belong to a vault
  const getVaultAssets = ({ username, fanId, sortBy = SortBy.VaultObjectSuffix, orderBy = SortOrder.Asc, take = 30 }: UseAssetsProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const loadAssets = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : assets.length;
      try {
        const { data } = await publicGetVaultAssetsQuery({
          take,
          skip,
          username,
          orderBy,
          relatedUserId: fanId,
          sortBy
        });

        const fetchedAssets = (data?.getPublicCreatorAssets.assets ?? []) as CreatorAssetsEntity[];

        setHasMore(fetchedAssets.length === take);

        if (initialLoad) setAssets(fetchedAssets);
        else setAssets([...assets, ...fetchedAssets]);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadAssets();
    };

    const handleRefresh = async () => {
      setAssets([]);
      loadAssets(true);
    };

    useEffect(() => {
      loadAssets(true);
    }, []);

    return { assets, handleLoadMore, loading, hasMore, onRefresh: handleRefresh };
  };

  // The assets which has fileType of Video
  const getPublicShorts = ({ sortBy = SortBy.AssetViewCount, orderBy = SortOrder.Desc, take = 5 }: UseAssetsProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadShorts = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : publicShorts.length;
      try {
        const { data } = await publicGetShortsQuery({ sortBy, orderBy, take, skip, relatedUserId: fan?.fanId });
        const fetchedShorts = data?.getPublicShorts as AssetsEntity[];

        setHasMore(fetchedShorts.length === take);

        if (initialLoad) setPublicShorts(fetchedShorts);
        else setPublicShorts([...publicShorts, ...fetchedShorts]);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadShorts();
    };

    const handleRefresh = () => {
      setPublicShorts([]);
      loadShorts(true);
    };

    useEffect(() => {
      loadShorts(true);
    }, []);

    return { handleLoadMore, loading, hasMore, publicShorts, onRefresh: handleRefresh };
  };

  // The assets which belong to a single post
  const getPostAssets = ({
    postId,
    username,
    fanId,
    sortBy = SortBy.VaultObjectSuffix,
    orderBy = SortOrder.Asc,
    take = 30
  }: UseAssetsProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const loadAssets = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : postAssets.length;
      try {
        const { data } = await publicGetPostAssetsQuery({
          take,
          skip,
          username,
          orderBy,
          relatedUserId: fanId,
          sortBy,
          relatedEntityId: postId
        });

        const fetchedPostsAssets = (data?.getPublicPostAssets.postAssets ?? []) as PostAssetsEntity[];

        setHasMore(fetchedPostsAssets.length === take);

        if (initialLoad) setPostAssets(fetchedPostsAssets);
        else setPostAssets([...postAssets, ...fetchedPostsAssets]);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadAssets();
    };

    const handleRefresh = async () => {
      setPostAssets([]);
      loadAssets(true);
    };

    useEffect(() => {
      loadAssets(true);
    }, []);

    return { postAssets, handleLoadMore, loading, hasMore, onRefresh: handleRefresh };
  };

  // The assets which the fan had purchased
  const getFanAssets = ({ orderBy = SortOrder.Asc, take = 30 }: UseAssetsProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const loadFanAssets = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : fanAssets.length;
      try {
        const { data } = await privateGetFanAssetsQuery({ skip, take, orderBy });
        const fetchedFanAssets = (data?.getFanAssets || []) as FanAssetsEntity[];

        setHasMore(fetchedFanAssets.length === take);

        if (initialLoad) setFanAssets(fetchedFanAssets);
        else setFanAssets([...fanAssets, ...fetchedFanAssets]);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadFanAssets();
    };

    const handleRefresh = () => {
      setFanAssets([]);
      loadFanAssets(true);
    };

    useEffect(() => {
      if (fan) loadFanAssets(true);
    }, [fan]);

    return { loading: fan ? loading : false, hasMore, handleLoadMore, handleRefresh, fanAssets };
  };

  return { getFanAssets, getPostAssets, getVaultAssets, getPublicShorts };
};
