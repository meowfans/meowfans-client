'use client';

import usePaypal, { CreateOrderInput } from '@/hooks/usePaypal';
import { configService } from '@/util/config';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PurchaseSheetProps } from './modals/PurchaseSheet';

export const Paypal = ({ entityId, purchaseType, amount, onTransactionDone, creatorId, zoneType }: PurchaseSheetProps) => {
  const { createOrder, onApprove } = usePaypal();

  const createOrderInput: CreateOrderInput = {
    quantity: 1,
    entityId: entityId,
    purchaseType: purchaseType,
    creatorId: creatorId,
    zoneType: zoneType
  };

  return (
    <div className="App">
      <PayPalScriptProvider
        options={{
          clientId: configService.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          enableFunding: 'card',
          disableFunding: 'venmo,paylater',
          // buyerCountry: '',
          currency: 'USD',
          components: 'buttons'
        }}
      >
        <PayPalButtons
          message={{
            amount: String(amount.toFixed(2))
          }}
          style={{
            shape: 'rect',
            layout: 'vertical',
            color: 'gold',
            label: 'paypal'
          }}
          createOrder={async () => {
            return await createOrder(createOrderInput);
          }}
          onApprove={async (data: any, actions: any) => {
            const status = await onApprove(data, actions, creatorId);
            onTransactionDone?.(status);
            return status;
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};
