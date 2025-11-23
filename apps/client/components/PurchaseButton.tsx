'use client';

import { usePaymentsStore } from '@/hooks/store/payments.store';
import type { ButtonProps } from '@workspace/ui/lib';
import { AuthAwareButton } from './AuthAwareButton';

interface PurchaseButtonProps extends ButtonProps {
  unlockPrice?: number | null;
  isPurchasable: boolean;
  className?: string;
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  unlockPrice,
  isPurchasable = true,
  variant = 'secondary',
  size = 'icon',
  title = 'Unlock content',
  className
}) => {
  const { setCheckoutModal } = usePaymentsStore();
  if (!isPurchasable || !unlockPrice) return null;
  return (
    <AuthAwareButton
      className={`${className}flex justify-center items-center bg-blue-500`}
      onClick={() => setCheckoutModal(true)}
      variant={variant}
      size={size}
      title={title}
    >
      Unlock ${unlockPrice}
    </AuthAwareButton>
  );
};
