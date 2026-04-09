'use client';

import { ImportSingleCreatorSheet } from '@/components/ImportSingleCreatorSheet';

interface SingleProfileViewProps {
  username: string;
}

export const SingleProfileView = ({ username }: SingleProfileViewProps) => {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Profile: <span className="text-foreground">@{username}</span>
          </h2>
          <p className="text-sm text-muted-foreground">Manage details and import content for @{username}</p>
        </div>
        <ImportSingleCreatorSheet username={username} />
      </div>
    </div>
  );
};
