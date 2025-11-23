"use client";

import { useIsMobile } from "@workspace/ui/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { ExtendedDialog } from "./Dialog";
import { ExtendedDrawer } from "./Drawer";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => unknown;
  title?: string;
  description?: string;
}

export const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  title,
  description,
}) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <ExtendedDialog
        isOpen={open}
        onClose={handleClose}
        title={title}
        description={description}
      >
        {children}
      </ExtendedDialog>
    );
  }

  return (
    <ExtendedDrawer
      isOpen={open}
      onClose={handleClose}
      title={title}
      description={description}
    >
      <div className="px-4 pb-10">{children}</div>
    </ExtendedDrawer>
  );
};
