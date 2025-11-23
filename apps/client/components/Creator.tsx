'use client';

import { useRouter } from 'next/navigation';
import { SAvatar } from '@workspace/ui/globals/SAvatar';

interface CreatorProps {
  username: string;
  avatarUrl: string;
}

export const Creator: React.FC<CreatorProps> = ({ username, avatarUrl }) => {
  const router = useRouter();

  return <SAvatar url={avatarUrl} onClick={() => router.push(`/creators/${username}`)} className="border-green-400 border-1" />;
};
