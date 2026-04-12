import { useCreatorsActions } from '@workspace/gql/actions';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useCreatorsStore } from './store/creators.store';

import { useImpersonationStore } from '@/hooks/store/impersonation.store';

interface UseUserProps {
 userIdOrName: string;
}

export const useUser = ({ userIdOrName }: UseUserProps) => {
 const [loading, setLoading] = useState<boolean>(false);
 const { errorHandler } = useErrorHandler();
 const { getUserQuery } = useCreatorsActions();
 const { user, setUser } = useCreatorsStore();
 const { onOpen } = useImpersonationStore();

 const loadCreator = async () => {
 setLoading(true);
 try {
  const { data } = await getUserQuery(userIdOrName);
  const fetchedCreator = data?.getUser as UsersEntity;
  setUser(fetchedCreator);
 } catch (error) {
  errorHandler({ error });
 } finally {
  setLoading(false);
 }
 };

 const impersonateCreator = async (userIdOrName: string) => {
 setLoading(true);
 try {
  const { data } = await getUserQuery(userIdOrName);
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

 useEffect(() => {
 loadCreator();
 }, [userIdOrName]);

 return { loading, loadCreator, user, impersonateCreator };
};
