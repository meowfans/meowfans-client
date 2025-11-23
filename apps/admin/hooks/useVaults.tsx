import { GET_CREATOR_VAULT_OBJECTS_QUERY } from '@workspace/gql/api/adminAPI';
import { DownloadStates, FileType, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { useVaultsStore } from '@/zustand/vaults.store';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

interface Props {
  creatorId: string;
  status: DownloadStates;
  fileType?: FileType;
}

export const useVaultObjects = ({ creatorId, status = DownloadStates.Pending, fileType = FileType.Image }: Props) => {
  const [hasNext, setHasNext] = useState<boolean>(false);
  const { vaultObjects, setVaultObjects } = useVaultsStore();

  const { data, refetch, loading, fetchMore } = useQuery(GET_CREATOR_VAULT_OBJECTS_QUERY, {
    variables: {
      input: {
        limit: 50,
        offset: 0,
        status: status || DownloadStates.Pending,
        relatedUserId: creatorId,
        fileType
      }
    }
  });

  const handleFetchMore = async (limit = 50) => {
    const { data: newData } = await fetchMore({
      variables: {
        input: {
          limit,
          offset: vaultObjects.length,
          status,
          relatedUserId: creatorId
        }
      }
    });
    const newFetchedVaultObjects = newData?.getCreatorVaultObjectsByAdmin.vaultObjects as VaultObjectsEntity[];
    setVaultObjects([...vaultObjects, ...newFetchedVaultObjects]);
    setHasNext(!!newFetchedVaultObjects.length);
    return newFetchedVaultObjects;
  };

  // const { count = 0 } = data?.getCreatorVaultObjectsByAdmin as GetCreatorVaultObjectsOutput;
  const fetchedVaultObjects = data?.getCreatorVaultObjectsByAdmin.vaultObjects as VaultObjectsEntity[];

  useEffect(() => {
    if (fetchedVaultObjects) {
      setVaultObjects(fetchedVaultObjects);
    }
  }, [data, status]);

  const handleRefetch = async () => {
    await refetch({ input: { limit: 50, offset: 0, status: status, relatedUserId: creatorId } });
  };

  return { handleRefetch, vaultObjects, setVaultObjects, loading, onFetchMore: handleFetchMore, hasNext, setHasNext };
};
