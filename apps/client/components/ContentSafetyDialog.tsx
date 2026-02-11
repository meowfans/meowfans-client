'use client';

import { useContentBlur } from '@/hooks/client/useContentBlur';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { EyeOff, ShieldAlert } from 'lucide-react';

interface ContentSafetyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContentSafetyDialog({ open, onOpenChange }: ContentSafetyDialogProps) {
  const { setBlurEnabled } = useContentBlur();

  const handleDisableBlur = () => {
    setBlurEnabled(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-background/95 backdrop-blur-3xl border-white/10 rounded-[2rem] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="flex flex-col items-center text-center gap-2">
          <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-2">
            <ShieldAlert className="h-8 w-8 text-red-500" />
          </div>
          <DialogTitle className="text-xl font-black italic uppercase tracking-tight">Disable Safety Filter?</DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium text-sm max-w-xs mx-auto">
            You are about to turn off content blurring for all media across the application. Sensitive content will be visible immediately.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-6 w-full sm:justify-center">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onOpenChange(false);
            }}
            className="w-full sm:w-auto flex-1 rounded-full h-12 font-black uppercase text-[10px] tracking-widest border-border/50 hover:bg-secondary/40 shrink-0"
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDisableBlur();
            }}
            className="w-full sm:w-auto flex-1 rounded-full h-12 bg-red-500 hover:bg-red-600 text-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg shadow-red-500/20 shrink-0 whitespace-nowrap"
          >
            <EyeOff className="h-4 w-4 shrink-0" />
            Disable Globally
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
