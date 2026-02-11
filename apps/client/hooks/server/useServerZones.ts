'use client';

import { getZones } from '@/app/server/getZones';
import { useZonesStore } from '@/hooks/store/zones.store';
import { GetZonePlansOutput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerZones = (initialZones: GetZonePlansOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { zonePlans, setZonePlans } = useZonesStore();
  const [loading, setLoading] = useState<boolean>(initialZones.length === 0);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const fetched = await getZones();
      const fetchedZones = (fetched ?? []) as GetZonePlansOutput[];
      setZonePlans(fetchedZones);
    } catch (error) {
      errorHandler({ error, msg: 'Error loading zones! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialZones?.length > 0) {
      setZonePlans(initialZones);
    }
  }, [initialZones, setZonePlans]);

  return {
    zonePlans,
    loading,
    loadPlans,
    refresh: loadPlans
  };
};
