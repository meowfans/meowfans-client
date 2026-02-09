'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import useAPI from '@/hooks/useAPI';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { LogOut, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutModal() {
  const router = useRouter();
  const { logout } = useAPI();
  const { openLogoutModal, setOpenLogoutModal } = useUtilsStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    logout();
    setOpenLogoutModal(false);
    setIsLoggingOut(false);
    router.refresh();
  };

  const handleCancel = () => {
    setOpenLogoutModal(false);
  };

  return (
    <Dialog open={openLogoutModal} onOpenChange={setOpenLogoutModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-xl font-black italic uppercase tracking-tight">Confirm Logout</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground pt-2">
            Are you sure you want to log out? You&apos;ll need to sign in again to access the admin dashboard.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoggingOut}
            className="w-full sm:w-auto rounded-full font-bold uppercase tracking-widest text-xs"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full sm:w-auto rounded-full font-bold uppercase tracking-widest text-xs gap-2"
          >
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? 'Logging Out...' : 'Yes, Logout'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
