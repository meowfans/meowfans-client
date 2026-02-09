'use client';

import { useLazyQuery } from '@apollo/client/react';
import { GET_PUBLIC_CREATOR_PROFILE_QUERY } from '@workspace/gql/api';
import { GetPublicCreatorProfileOutput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useCreatorProfile = (username: string) => {
  const { errorHandler } = useErrorHandler();
  const [profile, setProfile] = useState<GetPublicCreatorProfileOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [getCreatorProfile] = useLazyQuery(GET_PUBLIC_CREATOR_PROFILE_QUERY);

  const loadProfile = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const { data } = await getCreatorProfile({ variables: { username } });
      if (data?.getPublicCreatorProfile) {
        setProfile(data.getPublicCreatorProfile as GetPublicCreatorProfileOutput);
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [username]); //eslint-disable-line

  return { profile, loading, refresh: loadProfile };
};
