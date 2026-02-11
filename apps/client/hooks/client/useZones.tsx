import { useZonesActions } from '@workspace/gql/actions';
import { GetZonePlansOutput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useZonesStore } from '../store/zones.store';

export const useZones = () => {
  const { errorHandler } = useErrorHandler();
  const { setZonePlans, zonePlans } = useZonesStore();
  const { getZonePlansQuery } = useZonesActions();
  const [loading, setLoading] = useState<boolean>(false);

  const loadPlans = async () => {
    setLoading(zonePlans.length === 0);

    try {
      const { data } = await getZonePlansQuery();
      const fetched = (data?.getZonePlans || []) as GetZonePlansOutput[];
      setZonePlans(fetched);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []); //eslint-disable-line

  return { loading, setLoading, zonePlans };
};
