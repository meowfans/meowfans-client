import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { cn } from '@workspace/ui/lib/utils';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => unknown;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideCloseIcon?: boolean;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  backdropBlur?: boolean;
}

const sizeMap = {
  sm: 'sm:max-w-[380px]',
  md: 'sm:max-w-[450px]',
  lg: 'sm:max-w-[550px]',
  xl: 'sm:max-w-[750px]'
};

export const ExtendedDialog: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
  title = 'Edit modal',
  description = "Make changes here. Click save when you're done.",
  size = 'md',
  hideCloseIcon = false,
  showFooter = false,
  footerContent
}) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(sizeMap[size], 'z-50 max-h-[85vh] p-0 overflow-hidden flex flex-col')}
        aria-describedby="extended_dialog"
      >
        <DialogHeader className="text-left sticky top-0 bg-background z-20 p-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </div>

            {!hideCloseIcon && (
              <button onClick={handleClose} className="p-1 rounded-md hover:bg-muted transition">
                <X size={20} />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3">{children}</div>

        {showFooter && <div className="sticky bottom-0 bg-background border-t p-4">{footerContent}</div>}
      </DialogContent>
    </Dialog>
  );
};
