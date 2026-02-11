'use client';

import { getFanProfile } from '@/app/server/getFanProfile';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { FanProfilesEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerFanProfile = (initialFan: FanProfilesEntity | null) => {
  const { errorHandler } = useErrorHandler();
  const { fan, setFan } = useFan();
  const [loading, setLoading] = useState<boolean>(!initialFan);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await getFanProfile();
      if (data) {
        setFan(data as FanProfilesEntity);
      }
    } catch (error) {
      errorHandler({ error, msg: 'Error loading fan profile! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFan) {
      setFan(initialFan);
    }
  }, [initialFan, setFan]);

  return {
    fan,
    loading,
    refresh: loadProfile
  };
};
