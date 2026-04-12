'use client';

import { useAdmin } from '@/hooks/context/AdminContextWrapper';

import { ImportProgress } from './ImportProgress';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardObjectStatusOverview } from './dashboard/DashboardObjectStatusOverview';
import { DashboardQuickImpersonation } from './dashboard/DashboardQuickImpersonation';
import { UpdateCreatorProfiles } from './dashboard/UpdateCreatorProfiles';
import { UpdateVaultPreviews } from './dashboard/UpdateVaultPreviews';

export function DashboardView() {
  const { admin } = useAdmin();

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <DashboardHeader admin={admin} />
      <ImportProgress showChart={true} />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <DashboardQuickImpersonation />
        <DashboardObjectStatusOverview />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <UpdateVaultPreviews />
        <UpdateCreatorProfiles />
      </div>
    </div>
  );
}
