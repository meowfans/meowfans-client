'use client';

import { useImpersonationStore } from '@/hooks/store/impersonation.store';
import { configService } from '@/util/config';
import { useAuthActions } from '@workspace/gql/actions';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { creatorCookieKey } from '@workspace/ui/lib/constants';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { deleteCookie, setCookie } from 'cookies-next';
import { Loader2, MonitorSmartphone, UserCog } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ImpersonationModal() {
  const router = useRouter();
  const { isOpen, creatorId, onClose } = useImpersonationStore();
  const { issueImpersonationTokenMutation } = useAuthActions();
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState(false);

  const handleImpersonate = async () => {
    if (!creatorId) return;
    setLoading(true);
    try {
      const { data } = await issueImpersonationTokenMutation(creatorId);

      setCookie(creatorCookieKey, data?.issueImpersonationToken, {
        domain: configService.NEXT_PUBLIC_APP_DOMAINS
      });

      successHandler({ isEnabledConfetti: true, message: 'Impersonation session has started' });
      onClose();
      window.location.href = buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL });
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelImpersonation = () => {
    deleteCookie(creatorCookieKey, {
      domain: configService.NEXT_PUBLIC_APP_DOMAINS
    });
    onClose();
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-primary/10">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <UserCog className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black italic uppercase tracking-tight">Impersonate User</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Start a session as this user to manage their account.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4">
          <Button
            onClick={handleImpersonate}
            disabled={loading}
            className="w-full justify-start gap-3 h-14 bg-card hover:bg-primary/5 border border-primary/10 hover:border-primary/20 text-foreground transition-all"
            variant="ghost"
          >
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              {loading ? <Loader2 className="h-4 w-4 animate-spin text-amber-500" /> : <UserCog className="h-4 w-4 text-amber-500" />}
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-bold text-sm">Start Session Here</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Impersonate in current tab</span>
            </div>
          </Button>

          <Button
            onClick={handleImpersonate}
            disabled={loading}
            className="w-full justify-start gap-3 h-14 bg-card hover:bg-primary/5 border border-primary/10 hover:border-primary/20 text-foreground transition-all"
            variant="ghost"
          >
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              ) : (
                <MonitorSmartphone className="h-4 w-4 text-blue-500" />
              )}
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-bold text-sm">Switch to Creator App</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Open dashboard in new window</span>
            </div>
          </Button>
        </div>

        <DialogFooter className="sm:justify-between gap-2 border-t border-primary/5 pt-4">
          <Button
            variant="ghost"
            onClick={handleCancelImpersonation}
            disabled={loading}
            className="w-full sm:w-auto rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary/5"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
