import { useVaultObjectsStore, useVaultsStore } from '@/hooks/store/vaults.store';
import { useVaultsActions } from '@workspace/gql/actions';
import { GetAllObjectsCountOutput, GetVaultObjectsOutput, PaginationInput, VaultsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useVaultObjects = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const { vaultObjects, setVaultObjects } = useVaultObjectsStore();
  const { getCreatorVaultObjectsQuery } = useVaultsActions();
  const [username, setUsername] = useState<string | undefined>('');

  const loadVaultObjects = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaultObjects.length;
    setLoading(vaultObjects.length === 0);

    try {
      const { data } = await getCreatorVaultObjectsQuery({ ...params, skip });

      const fetched = data?.getCreatorVaultObjectsByAdmin as GetVaultObjectsOutput[];
      setHasNext(!!fetched.length);
      setVaultObjects(initialLoad ? fetched : [...vaultObjects, ...fetched]);
      setUsername(vaultObjects[0]?.username);
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
  }, [params.status, params.fileType, params.relatedUserId, params.take]); //eslint-disable-line

  return {
    vaultObjects,
    hasNext,
    handleLoadMore,
    loading,
    username
  };
};

export const useVaults = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const { vaults, setVaults } = useVaultsStore();
  const { getCreatorVaultsByAdminQuery } = useVaultsActions();

  const loadVaultObjects = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaults.length;
    setLoading(vaults.length === 0);

    try {
      const { data } = await getCreatorVaultsByAdminQuery({ ...params, skip });

      const fetched = data?.getCreatorVaultsByAdmin as VaultsEntity[];
      setHasNext(!!fetched.length);
      setVaults(initialLoad ? fetched : [...vaults, ...fetched]);
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
  }, [params.status, params.fileType, params.relatedUserId, params.take]); //eslint-disable-line

  return {
    vaults,
    hasNext,
    handleLoadMore,
    loading,
  };
};

export const useGetAllObjectsCount = () => {
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(false);
  const { getAllObjectsCountOfEachTypeQuery } = useVaultsActions();
  const { objectsCount, setObjectsCount } = useVaultObjectsStore();

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
