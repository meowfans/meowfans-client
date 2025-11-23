'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@workspace/ui/components/sheet';
import { PurchaseType, ZoneTypes } from '@workspace/gql/generated/graphql';
import { useState } from 'react';
import { AuthAwareButton } from '../AuthAwareButton';
import { Paypal } from '../Paypal';
import { Button } from '@workspace/ui/components/button';

export interface PurchaseSheetProps {
  children?: React.ReactNode;
  username?: string;
  entityId: string;
  amount: number;
  creatorId: string;
  quantity?: number;
  zoneType?: ZoneTypes;
  purchaseType: PurchaseType;
  onToggle?: (open: boolean) => void;
  onTransactionDone?: (status: string) => unknown;
  className?: string;
}

export const PurchaseSheet = ({
  username,
  entityId,
  creatorId,
  amount,
  purchaseType = PurchaseType.Post,
  quantity = 1,
  zoneType = ZoneTypes.Onetime,
  onToggle = () => {},
  className
}: PurchaseSheetProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = (isOpen: boolean) => {
    onToggle(isOpen);
    setOpen(isOpen);
  };

  const handleTransactionDone = () => {
    setOpen(false);
    handleToggle(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleToggle}>
      <SheetTrigger asChild className={`${className} h-fit w-fit bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>
        <AuthAwareButton allowPropagation variant="outline">
          Unlock ${amount}
        </AuthAwareButton>
      </SheetTrigger>

      <SheetContent className="overflow-y-scroll h-full m-1 p-1">
        <SheetHeader>
          <SheetTitle>Unlock premium content for ${amount}</SheetTitle>
          <SheetDescription>Your contribution helps creators continue their amazing work.</SheetDescription>
        </SheetHeader>
        <Paypal
          username={username}
          entityId={entityId}
          purchaseType={purchaseType}
          quantity={quantity}
          amount={amount}
          zoneType={zoneType}
          creatorId={creatorId}
          onTransactionDone={handleTransactionDone}
        />
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={'default'} size={'lg'}>
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
