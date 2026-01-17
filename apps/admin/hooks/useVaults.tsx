import { useVaultsStore } from '@/zustand/vaults.store';
import { useQuery } from '@apollo/client/react';
import { GET_CREATOR_VAULT_OBJECTS_QUERY } from '@workspace/gql/api/adminAPI';
import { DownloadStates, FileType, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';

interface Props {
  creatorId: string;
  status: DownloadStates;
  fileType?: FileType;
  limit?: number;
}

export const useVaultObjects = ({ creatorId, status = DownloadStates.Pending, fileType = FileType.Image, limit = 50 }: Props) => {
  const { vaultObjects, setVaultObjects } = useVaultsStore();
  const [hasNext, setHasNext] = useState<boolean>(false);

  const { data, loading, refetch, fetchMore } = useQuery(GET_CREATOR_VAULT_OBJECTS_QUERY, {
    variables: {
      input: { limit, offset: 0, status, relatedUserId: creatorId, fileType }
    },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    const fetched = data?.getCreatorVaultObjectsByAdmin.vaultObjects as VaultObjectsEntity[];
    if (fetched) {
      setVaultObjects(fetched);
      setHasNext(fetched.length === limit);
    }
  }, [data, status, fileType, limit]); //eslint-disable-line

  const handleFetchMore = async (_limit = 50) => {
    if (!hasNext) return [];
    const { data: newData } = await fetchMore({
      variables: {
        input: {
          limit: _limit,
          offset: vaultObjects.length,
          status,
          relatedUserId: creatorId,
          fileType
        }
      }
    });
    const newFetched = newData?.getCreatorVaultObjectsByAdmin.vaultObjects as VaultObjectsEntity[];
    if (newFetched.length) {
      setVaultObjects([...vaultObjects, ...newFetched]);
      setHasNext(newFetched.length === limit);
    } else {
      setHasNext(false);
    }
    return newFetched;
  };

  const handleRefetch = async () => {
    const { data: newData } = await refetch({
      input: { limit, offset: 0, status, relatedUserId: creatorId, fileType }
    });
    const fetched = newData?.getCreatorVaultObjectsByAdmin.vaultObjects as VaultObjectsEntity[];
    setVaultObjects(fetched || []);
    setHasNext(fetched?.length === limit);
  };

  return {
    vaultObjects,
    loading,
    hasNext,
    onFetchMore: handleFetchMore,
    handleRefetch,
    setVaultObjects,
    setHasNext
  };
};
