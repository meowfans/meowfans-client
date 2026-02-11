'use client';

import { getPublicCreatorProfile } from '@/app/server/getPublicCreatorProfile';
import { GetPublicCreatorProfileOutput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerCreatorProfile = (username: string, initialProfile: GetPublicCreatorProfileOutput | null) => {
  const { errorHandler } = useErrorHandler();
  const [profile, setProfile] = useState<GetPublicCreatorProfileOutput | null>(initialProfile);
  const [loading, setLoading] = useState<boolean>(!initialProfile);

  const loadProfile = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const data = await getPublicCreatorProfile(username);
      if (data) {
        setProfile(data as GetPublicCreatorProfileOutput);
      }
    } catch (error) {
      errorHandler({ error, msg: 'Error loading creator profile! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);

  return {
    profile,
    loading,
    refresh: loadProfile
  };
};
