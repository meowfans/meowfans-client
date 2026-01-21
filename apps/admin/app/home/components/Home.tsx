'use client';

import { Impersonate } from '@/components/Impersonate';
import { DeleteAllAssetsModal } from '@/components/modals/DeleteAllAssetsModal';
import { UpdateAllCreatorProfilesModal } from '@/components/modals/UpdateAllCreatorProfilesModal';
import { UpdatePreviewOfVaultsModal } from '@/components/modals/UpdatePreviewOfVaultsModal';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { ImportCreatorsSheet } from '../../vaults/components/ImportCreatorsSheet';
import { ImpersonateCreatorSheet } from './ImpersonateCreatorSheet';

export const Home = () => {
  const [openUpdateAllCreatorsModal, setOpenUpdateAllCreatorsModal] = useState<boolean>(false);
  const [updateVaultPreviewModal, setUpdateVaultPreviewModal] = useState<boolean>(false);
  const [deleteAllAssetsModal, setDeleteAllAssetsModal] = useState(false);
  const { switchContext } = useUtilsStore();

  return (
    <PageManager>
      <div className="flex flex-col gap-8 p-6 md:p-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor system activity, manage creators, and control platform operations.</p>
        </div>

        <Separator />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Assets" value="12,480" subtitle="Across all creators" />
          <StatCard title="Active Creators" value="324" subtitle="Last 30 days" />
          <StatCard title="Storage Used" value="1.8 TB" subtitle="78% capacity" />
          <StatCard title="Daily Uploads" value="+146" subtitle="Today" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ImportCreatorsSheet />
          <Button variant="outline" className="w-full justify-start" onClick={() => setOpenUpdateAllCreatorsModal(true)}>
            Update all creator profiles
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => setUpdateVaultPreviewModal(true)}>
            Update all vault previews
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            Reset to defaults
          </Button>
          <UpdatePreviewOfVaultsModal isOpen={updateVaultPreviewModal} onClose={() => setUpdateVaultPreviewModal(false)} />
          <TriggerModal
            onChangeModalState={() => setDeleteAllAssetsModal(true)}
            className="bg-red-600"
            modalIcon={{ icon: Trash }}
            modalText="Delete your assets"
          />
          <UpdateAllCreatorProfilesModal isOpen={openUpdateAllCreatorsModal} onClose={() => setOpenUpdateAllCreatorsModal(false)} />
          {/* Single-creator tools (mobile + desktop sheet) */}
          <ImpersonateCreatorSheet />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system and user actions</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Activity feed component goes here</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Background jobs and services</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Workers running • Queue stable • No incidents</CardContent>
          </Card>
        </div>

        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={() => setDeleteAllAssetsModal(true)}>
              Delete All Assets
            </Button>
          </CardContent>
        </Card>
      </div>

      <DeleteAllAssetsModal isOpen={deleteAllAssetsModal} setOpen={setDeleteAllAssetsModal} />
      {/* Global impersonation modal controlled via utils store */}
      <Impersonate creator={switchContext} />
    </PageManager>
  );
};

const StatCard = ({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </CardContent>
  </Card>
);
