'use client';

import usePaypal, { CreateOrderInput } from '@/hooks/usePaypal';
import { configService } from '@/util/config';
import { FUNDING, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

export const Paypal = ({
  entityId,
  purchaseType,
  amount,
  onTransactionDone,
  creatorId,
  zoneType,
  fundingSource,
  quantity = 1
}: Omit<CreateOrderInput, 'quantity'> & {
  onTransactionDone: (status: string) => void;
  amount: number;
  fundingSource?: 'paypal' | 'card';
  quantity?: number;
}) => {
  const { createOrder, onApprove } = usePaypal();

  const createOrderInput: CreateOrderInput = {
    quantity: 1,
    entityId: entityId,
    purchaseType: purchaseType,
    creatorId: creatorId,
    zoneType: zoneType
  };

  const paypalFundingSource = fundingSource === 'card' ? FUNDING.CARD : FUNDING.PAYPAL;

  return (
    <div className="App">
      <PayPalScriptProvider
        options={{
          clientId: configService.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          enableFunding: 'card',
          disableFunding: 'venmo,paylater',
          currency: 'USD',
          components: 'buttons'
        }}
      >
        <PayPalButtons
          key={fundingSource || 'default'}
          fundingSource={paypalFundingSource}
          message={{
            amount: String(amount.toFixed(2))
          }}
          style={{
            shape: 'rect',
            layout: 'vertical',
            color: fundingSource === 'card' ? 'black' : 'gold',
            label: fundingSource === 'card' ? undefined : 'paypal'
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
