'use client';

import { GalleryHorizontalEnd } from 'lucide-react';

interface MultipleObjectsIconProps {
  hasMultiple: boolean;
}

export const MultipleObjectsIcon: React.FC<MultipleObjectsIconProps> = ({ hasMultiple }) => {
  return hasMultiple ? (
    <div className="flex justify-end p-1" title="Multiple objects">
      <GalleryHorizontalEnd className="h-5 w-5 fill-white" />
    </div>
  ) : null;
};
