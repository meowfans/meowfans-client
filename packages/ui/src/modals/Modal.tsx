'use client';

import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { useEffect, useState } from 'react';
import { ExtendedDialog } from './Dialog';
import { ExtendedDrawer } from './Drawer';

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => unknown;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children, title, description, footerContent }) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <ExtendedDialog isOpen={open} onClose={handleClose} title={title} description={description} footerContent={footerContent}>
        {children}
      </ExtendedDialog>
    );
  }

  return (
    <ExtendedDrawer isOpen={open} onClose={handleClose} title={title} description={description} footerContent={footerContent}>
      <div className="px-4 pb-10">{children}</div>
    </ExtendedDrawer>
  );
};
