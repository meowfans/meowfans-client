'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { useMutation } from '@apollo/client/react';
import { ISSUE_IMPERSONATE_TOKEN_MUTATION } from '@workspace/gql/api';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { adminCookieKey, authCookieKey, impersonatedCreatorId } from '@workspace/ui/lib/constants';
import { decodeJwtToken } from '@workspace/ui/lib/helpers';
import { getCookie, setCookie } from 'cookies-next';
import { VenetianMask } from 'lucide-react';
import { ContextSwitchModal } from './modals/ContextSwitchModal';

interface ImpersonateProps {
  creator: UsersEntity;
}

export const Impersonate: React.FC<ImpersonateProps> = ({ creator }) => {
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const { setSwitchContext } = useUtilsStore();
  const [startImpersonation] = useMutation(ISSUE_IMPERSONATE_TOKEN_MUTATION);

  const handleStartImpersonation = async (creatorId: string) => {
    try {
      const existingCookieKey = getCookie(authCookieKey);
      setCookie(adminCookieKey, existingCookieKey);

      const { data } = await startImpersonation({ variables: { creatorId } });

      setCookie(authCookieKey, data?.issueImpersonationToken);
      const decodedToken = decodeJwtToken(data?.issueImpersonationToken);
      setCookie(impersonatedCreatorId, decodedToken?.sub);

      setSwitchContext(true);

      successHandler({ isEnabledConfetti: true, message: 'Impersonation session has started' });
    } catch (error) {
      errorHandler({ error });
    }
  };
  return (
    <div>
      <Button size="sm" variant="outline" onClick={() => handleStartImpersonation(creator.id )}>
        <VenetianMask className="w-2 h-2 sm:mr-1" />
        <span className="hidden text-xs sm:inline">Mask</span>
      </Button>
      <ContextSwitchModal creator={creator} />
    </div>
  );
};
