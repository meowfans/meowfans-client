'use client';

import { Paypal } from '@/components/Paypal';
import { CreateOrderInput } from '@/hooks/usePaypal';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import { useState } from 'react';

export interface PaymentModalProps extends Omit<CreateOrderInput, 'quantity'> {
  amount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function PaymentModal({
  open,
  onOpenChange,
  amount,
  title = 'Select Payment Method',
  description = 'Choose how you would like to complete your purchase',
  ...paypalProps
}: PaymentModalProps) {
  const [method, setMethod] = useState<'paypal' | 'card' | null>(null);

  const handleTransactionDone = (status: string) => {
    if (status === 'COMPLETED' || status === 'APPROVED') {
      setTimeout(() => {
        onOpenChange(false);
        window.location.reload();
      }, 300);
    }
  };

  const resetAndClose = (isOpen: boolean) => {
    if (!isOpen) {
      setMethod(null);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{method ? 'Complete Payment' : title}</DialogTitle>
          <DialogDescription>
            {method ? `Paying $${amount.toFixed(2)} via ${method === 'paypal' ? 'PayPal' : 'Card'}` : description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {!method ? (
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-3 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                onClick={() => setMethod('paypal')}
              >
                <div className="p-2 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Wallet className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">PayPal</span>
                  <span className="text-xs text-muted-foreground">Safe & Fast</span>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-3 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                onClick={() => setMethod('card')}
              >
                <div className="p-2 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <CreditCard className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Debit or Credit Card</span>
                  <span className="text-xs text-muted-foreground">All major cards supported</span>
                </div>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium">Amount to Pay</span>
                <span className="text-lg font-bold text-primary">${amount.toFixed(2)}</span>
              </div>

              <div className="min-h-[150px]">
                <Paypal
                  {...paypalProps}
                  amount={amount}
                  fundingSource={method as 'paypal' | 'card'}
                  onTransactionDone={handleTransactionDone}
                />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground hover:text-foreground"
                onClick={() => setMethod(null)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to payment methods
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
