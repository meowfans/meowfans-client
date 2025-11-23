'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useRouter } from 'next/navigation';
import { LoginButton } from './LoginButton';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { SignUpButton } from './SignUpButton';

export const Credentials = () => {
  const { fan } = useFan();
  const router = useRouter();
  return fan ? (
    <SAvatar url={fan?.user.avatarUrl} onClick={() => router.push('/settings')} className="border-green-400 border-1" />
  ) : (
    <div className="flex space-x-2 p-0 m-0">
      <LoginButton />
      <SignUpButton />
    </div>
  );
};
