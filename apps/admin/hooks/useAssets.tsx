import { GET_CREATORS_ASSETS_QUERY } from '@workspace/gql/api/adminAPI';
import { AssetType, CreatorAssetsEntity, SortOrder } from '@workspace/gql/generated/graphql';
import { useAssetsStore } from '@/zustand/assets.store';
import { CombinedGraphQLErrors } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  username: string;
  assetType: AssetType;
}

export const useAssets = ({ username, assetType = AssetType.Private }: Props) => {
  const [getCreatorsAssetsQuery] = useLazyQuery(GET_CREATORS_ASSETS_QUERY);
  const { assets, setAssets } = useAssetsStore();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoadAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : assets.length;
    try {
      const { data } = await getCreatorsAssetsQuery({
        variables: { input: { take: 50, skip, assetType: assetType, relatedUserId: username, orderBy: SortOrder.Asc } }
      });

      const fetchedAssets = data?.getCreatorAssetsByAdmin as CreatorAssetsEntity[];
      setHasMore(fetchedAssets.length === 50);

      if (initialLoad) setAssets(fetchedAssets);
      else setAssets([...assets, ...fetchedAssets]);
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      } else if (error instanceof CombinedGraphQLErrors) {
        console.log('GraphQL errors:', error.errors);
      } else {
        console.error('Other error:', error);
      }
      toast.error('Something wrong happened!!');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) handleLoadAssets();
  };

  useEffect(() => {
    handleLoadAssets(true);
  }, []);

  return { hasMore, loading, onLoadMore: handleLoadMore, assets, setAssets };
};
