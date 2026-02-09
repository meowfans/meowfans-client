'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { CreatorApprovalStatus } from '@workspace/gql/generated/graphql';
import { RejectedView } from './RejectedView';
import { VerificationFormView } from './VerificationFormView';
import { WaitingApprovalView } from './WaitingApprovalView';

export function CreatorStatusGuard({ children }: { children: React.ReactNode }) {
  const { creator } = useCreator();

  if (!creator) return null;

  switch (creator.status) {
    case CreatorApprovalStatus.Accepted:
      return <>{children}</>;
    case CreatorApprovalStatus.Review:
      return <VerificationFormView />;
    case CreatorApprovalStatus.Requested:
      return <WaitingApprovalView />;
    case CreatorApprovalStatus.Rejected:
      return <RejectedView reason={creator.rejectionReason || undefined} />;
    default:
      return null;
  }
}
