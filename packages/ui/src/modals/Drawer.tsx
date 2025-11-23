import React, { useEffect, useState } from 'react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@workspace/ui/components/drawer';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => unknown;
  title?: string;
  description?: string;
}

export const ExtendedDrawer: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
  title = 'Edit modal',
  description = "Make changes to your profile here. Click save when you're done."
}) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      {/* pb safe -- fixes iOS bottom padding || overflow overflow-hidden -- avoids clipping  */}
      <DrawerContent className="max-h-[95vh] h-auto pb-safe overflow-hidden z-50">
        <div className="flex flex-col h-full overflow-hidden">
          <DrawerHeader className="text-left sticky top-0 bg-background z-10">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto pb-6">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
