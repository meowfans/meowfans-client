import { PaymentsEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type PaymentsStore = {
  checkoutModal: boolean;
  payments: PaymentsEntity[];
  setPayments: (updater: Updater<PaymentsEntity[]>) => void;
  setCheckoutModal: (updater: Updater<boolean>) => void;
};

export const usePaymentsStore = create<PaymentsStore>((set) => ({
  payments: [],
  checkoutModal: false,
  setPayments: (updater) => set((state) => ({ payments: typeof updater === 'function' ? updater(state.payments) : updater })),
  setCheckoutModal: (updater) => set((state) => ({ checkoutModal: typeof updater === 'function' ? updater(state.checkoutModal) : updater }))
}));
