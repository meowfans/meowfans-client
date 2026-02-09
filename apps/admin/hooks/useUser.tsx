import { useCreatorsActions } from '@workspace/gql/actions';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useState } from 'react';
import { useCreatorsStore } from './store/creators.store';

import { useImpersonationStore } from '@/hooks/store/impersonation.store';

export const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { errorHandler } = useErrorHandler();
  const { getUserQuery } = useCreatorsActions();
  const { user, setUser } = useCreatorsStore();
  const { onOpen } = useImpersonationStore();

  const loadCreator = async (username: string) => {
    setLoading(true);
    try {
      const { data } = await getUserQuery(username);
      const fetchedCreator = data?.getUser as UsersEntity;
      setUser(fetchedCreator);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const impersonateCreator = async (username: string) => {
    setLoading(true);
    try {
      const { data } = await getUserQuery(username);
      const fetchedCreator = data?.getUser as UsersEntity;
      if (fetchedCreator?.id) {
        onOpen(fetchedCreator.id);
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { loading, loadCreator, user, impersonateCreator };
};
