import { useVaultMutations } from '@/hooks/useVaults';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { Modal } from '@workspace/ui/modals/Modal';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export const UpdateVaultPreviews = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, updatePreviewOfVaults } = useVaultMutations();

  const handleUpdate = async () => {
    await updatePreviewOfVaults();
    setIsOpen(false);
  };

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl shadow-black/5">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Vault Previews
          </CardTitle>
          <CardDescription className="text-xs uppercase font-bold opacity-70">Global Maintenance Action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">
            Trigger a system-wide update of all vault object previews. This will ensure all thumbnails and preview metadata are up-to-date
            across the platform.
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            className="w-full h-11 md:h-12 font-black uppercase tracking-tighter shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300"
            variant="secondary"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Update All Previews
          </Button>
        </CardContent>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Preview Update"
        description="This will trigger a system-wide update of all vault object previews. This operation may take some time to process globally."
      >
        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-500/80">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-xs font-semibold uppercase tracking-tight">Warning: This is a resource-intensive global action.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setIsOpen(false)} className="flex-1 font-bold uppercase tracking-tight rounded-xl">
              Cancel
            </Button>
            <LoadingButtonV2
              loading={loading}
              onClick={handleUpdate}
              className="flex-1 font-black uppercase tracking-tight shadow-lg shadow-primary/20 rounded-xl"
              variant="secondary"
            >
              Confirm Update
            </LoadingButtonV2>
          </div>
        </div>
      </Modal>
    </>
  );
};
