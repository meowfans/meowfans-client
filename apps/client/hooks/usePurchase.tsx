import { usePurchasesStore } from '@/hooks/store/purchases.store';
import { PURCHASE_POST_MUTATION } from '@workspace/gql/api/paymentsAPI';
import { CreatePurchasePostInput, PostPurchasesEntity } from '@workspace/gql/generated/graphql';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { toast } from 'sonner';

export const usePurchasePost = () => {
  const [purchasePost] = useMutation(PURCHASE_POST_MUTATION);
  const [loading, setLoading] = useState<boolean>(false);
  const { postPurchases, setPostPurchases } = usePurchasesStore();

  const handlePurchasePost = async (input: CreatePurchasePostInput) => {
    setLoading(true);
    try {
      const { data } = await purchasePost({ variables: { input } });

      const purchasedPost = data?.purchasePost as PostPurchasesEntity;

      setPostPurchases([purchasedPost, ...postPurchases]);
      toast.success('Successfully purchased');
    } catch (error) {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
    }
  };

  return { onPurchasePost: handlePurchasePost, loading };
};
