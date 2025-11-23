import { PaymentsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type PaymentsStore = {
  checkoutModal: boolean;
  payments: PaymentsEntity[];
  setPayments: (payments: PaymentsEntity[]) => void;
  setCheckoutModal: (checkoutModal: boolean) => void;
};

export const usePaymentsStore = create<PaymentsStore>((set) => ({
  payments: [],
  checkoutModal: false,
  setPayments: (payments: PaymentsEntity[]) => set({ payments }),
  setCheckoutModal: (checkoutModal: boolean) => set({ checkoutModal })
}));
