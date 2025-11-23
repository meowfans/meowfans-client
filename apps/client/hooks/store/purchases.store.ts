import { PostPurchasesEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type PurchasesStore = {
  postPurchases: PostPurchasesEntity[];
  setPostPurchases: (postPurchases: PostPurchasesEntity[]) => void;
};

export const usePurchasesStore = create<PurchasesStore>((set) => ({
  postPurchases: [],
  setPostPurchases: (postPurchases: PostPurchasesEntity[]) => set({ postPurchases })
}));
