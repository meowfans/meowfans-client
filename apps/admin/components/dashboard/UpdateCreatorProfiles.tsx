import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { Modal } from '@workspace/ui/modals/Modal';
import { AlertCircle, Users } from 'lucide-react';
import { useState } from 'react';

export const UpdateCreatorProfiles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, updateAllCreatorProfiles } = useCreatorMutations();

  const handleUpdate = async () => {
    await updateAllCreatorProfiles();
    setIsOpen(false);
  };

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl shadow-black/5">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Creator Profiles
          </CardTitle>
          <CardDescription className="text-xs uppercase font-bold opacity-70">Global Maintenance Action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">
            Re-sync and update all creator profiles with the latest platform data. This helps in keeping analytics and profile details
            consistent.
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            className="w-full h-11 md:h-12 font-black uppercase tracking-tighter shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300"
            variant="secondary"
          >
            <Users className="h-4 w-4 mr-2" />
            Update All Profiles
          </Button>
        </CardContent>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Profile Update"
        description="Are you sure you want to re-sync all creator profiles? This will update all creator metadata across the system."
      >
        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-500/80">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-xs font-semibold uppercase tracking-tight">Note: This action ensures data consistency for all creators.</p>
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
