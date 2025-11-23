'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import type { ButtonProps } from '@workspace/ui/lib';
import { LogOut } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

export const LogoutButton: React.FC<ButtonProps> = ({ variant = 'destructive', size = 'sm', title = 'Explore', ...props }) => {
  const { setOpenLogoutModal } = useUtilsStore();
  return (
    <Button variant={variant} size={size} title={title} onClick={() => setOpenLogoutModal(true)} {...props}>
      <LogOut />
      Logout
    </Button>
  );
};
