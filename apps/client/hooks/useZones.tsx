import { ZonePlansEntity } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { useZonesActions } from './api/zones.actions';
import { useZonesStore } from './store/zones.store';
import { useErrorHandler } from './useErrorHandler';

export const useZones = () => {
  const { errorHandler } = useErrorHandler();
  const { setZonePlans, zonePlans } = useZonesStore();
  const { getZonePlansQuery } = useZonesActions();

  const getZonePlans = (isOpen: boolean) => {
    const [loading, setLoading] = useState<boolean>(false);

    const loadPlans = async () => {
      try {
        setLoading(true);
        const { data } = await getZonePlansQuery();
        const fetched = (data?.getZonePlans || []) as ZonePlansEntity[];
        setZonePlans(fetched);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (isOpen) loadPlans();
    }, [isOpen]);

    return { loading, setLoading, zonePlans };
  };

  return { getZonePlans };
};
