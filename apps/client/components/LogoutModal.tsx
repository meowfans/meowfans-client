'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { useAPI } from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { LogOut, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LogoutModal() {
  const { openLogoutModal, setOpenLogoutModal } = useUtilsStore();
  const router = useRouter();
  const { logout } = useAPI();

  const handleLogout = () => {
    logout();
    router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL, pathname: '/login' }));
    setOpenLogoutModal(false);
  };

  return (
    <Dialog open={openLogoutModal} onOpenChange={setOpenLogoutModal}>
      <DialogContent
        className="sm:max-w-md bg-background/95 backdrop-blur-3xl border-white/10 rounded-[2rem] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="flex flex-col items-center text-center gap-2">
          <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-2">
            <ShieldAlert className="h-8 w-8 text-red-500" />
          </div>
          <DialogTitle className="text-xl font-black italic uppercase tracking-tight">Logout</DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium text-sm max-w-xs mx-auto">
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-6 w-full sm:justify-center">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setOpenLogoutModal(false);
            }}
            className="w-full sm:w-auto flex-1 rounded-full h-12 font-black uppercase text-[10px] tracking-widest border-border/50 hover:bg-secondary/40 shrink-0"
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className="w-full sm:w-auto flex-1 rounded-full h-12 bg-red-500 hover:bg-red-600 text-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg shadow-red-500/20 shrink-0 whitespace-nowrap"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
