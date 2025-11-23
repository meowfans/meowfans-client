import { FetchMethods } from '@workspace/ui/lib';
import { PurchaseType, ZoneTypes } from '@workspace/gql/generated/graphql';
import { toast } from 'sonner';
import { fetchRequest } from './useAPI';

export interface CreateOrderInput {
  entityId: string;
  purchaseType: PurchaseType;
  quantity: number;
  creatorId: string;
  zoneType?: ZoneTypes;
}

const usePaypal = () => {
  const createOrder = async (input: CreateOrderInput) => {
    try {
      const response = await fetchRequest({
        fetchMethod: FetchMethods.POST,
        pathName: '/paypal/orders',
        init: {
          body: JSON.stringify(input),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      toast.error(`Could not initiate PayPal Checkout...`);
      console.error(error);
    }
  };

  const onApprove = async (data: any, actions: any, creatorId: string) => {
    try {
      const response = await fetchRequest({
        fetchMethod: FetchMethods.POST,
        pathName: `/paypal/orders/${data.orderID}/${creatorId}/capture`,
        init: {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      });

      const orderData = await response.json();
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        toast.success(`Transaction ${transaction.status}: ${transaction.id}.`);
        return transaction.status;
      }
    } catch (error) {
      toast.error(`Sorry, your transaction could not be processed...`);
    }
  };

  return { createOrder, onApprove };
};

export default usePaypal;
