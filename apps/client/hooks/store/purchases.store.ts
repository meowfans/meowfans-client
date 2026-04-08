import { PostPurchasesEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type PurchasesStore = {
  postPurchases: PostPurchasesEntity[];
  setPostPurchases: (updater: Updater<PostPurchasesEntity[]>) => void;
};

export const usePurchasesStore = create<PurchasesStore>((set) => ({
  postPurchases: [],
  setPostPurchases: (updater) => set((state) => ({ postPurchases: typeof updater === 'function' ? updater(state.postPurchases) : updater }))
}));
