import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@workspace/ui/components/drawer';
import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => unknown;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export const ExtendedDrawer: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
  title = 'Edit modal',
  description = "Make changes to your profile here. Click save when you're done.",
  footerContent
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
      {footerContent && <DrawerFooter>{footerContent}</DrawerFooter>}
    </Drawer>
  );
};
