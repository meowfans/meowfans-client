import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useVaultsActions } from '@workspace/gql/actions';
import { FileType, GetAllObjectsCountOutput, PaginationInput, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useVaultObjects = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const { vaultObjects, setVaultObjects } = useVaultsStore();
  const { getCreatorVaultObjectsQuery } = useVaultsActions();

  const loadVaultObjects = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaultObjects.length;
    setLoading(vaultObjects.length === 0);

    try {
      const { data } = await getCreatorVaultObjectsQuery({
        ...params,
        skip,
        fileType: FileType.Image
      });

      const fetched = data?.getCreatorVaultObjectsByAdmin.vaultObjects as VaultObjectsEntity[];
      setHasNext(!!fetched.length);

      if (initialLoad) setVaultObjects(fetched);
      else setVaultObjects([...vaultObjects, ...fetched]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasNext) loadVaultObjects();
  };

  useEffect(() => {
    loadVaultObjects(true);
  }, [params.status, params.fileType]); //eslint-disable-line

  return {
    vaultObjects,
    hasNext,
    handleLoadMore,
    loading
  };
};

export const useGetAllObjectsCount = () => {
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(false);
  const { getAllObjectsCountOfEachTypeQuery } = useVaultsActions();

  const [objectsCount, setObjectsCount] = useState<GetAllObjectsCountOutput>({
    fulfilled: 0,
    pending: 0,
    processing: 0,
    rejected: 0
  });

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const { data } = await getAllObjectsCountOfEachTypeQuery();
      setObjectsCount(data?.getCountOfObjectsOfEachType as GetAllObjectsCountOutput);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchCounts, objectsCount };
};
