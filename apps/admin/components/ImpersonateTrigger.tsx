'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { VenetianMask } from 'lucide-react';

interface ImpersonateCreatorTriggerProps {
  creator: UsersEntity;
}

export const ImpersonateCreatorTrigger: React.FC<ImpersonateCreatorTriggerProps> = ({ creator }) => {
  const { setSwitchContext } = useUtilsStore();

  return (
    <Button size="sm" variant="outline" onClick={() => setSwitchContext(creator)}>
      <VenetianMask className="w-2 h-2 sm:mr-1" />
      <span className="hidden text-xs sm:inline">Mask</span>
    </Button>
  );
};
