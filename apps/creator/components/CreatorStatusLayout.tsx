'use client';

import { CreatorApprovalStatus } from '@workspace/gql/generated/graphql';

export function CreatorStatusLayout({ status }: { status: CreatorApprovalStatus }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Account Status: {status}</h1>
      <p className="text-muted-foreground">Your creator account is currently under review or not accepted.</p>
    </div>
  );
}
