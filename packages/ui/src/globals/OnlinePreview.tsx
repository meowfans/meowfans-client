'use client';

import { Cable } from 'lucide-react';
import { SAvatar } from './SAvatar';

interface OnlinePreviewProps {
  avatarUrl: string;
  isOnline: boolean;
}
export const OnlinePreview: React.FC<OnlinePreviewProps> = ({ avatarUrl, isOnline }) => {
  return (
    <div className="relative">
      <SAvatar url={avatarUrl} />
      <div className="absolute bottom-0 right-0">{isOnline ? <Cable className="text-sky-400 w-4 h-4 rotate-90" /> : <Cable className='w-4 h-4' />}</div>
    </div>
  );
};
