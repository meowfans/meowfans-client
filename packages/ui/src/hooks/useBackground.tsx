'use client';

import { useEffect, useState } from 'react';
import { BackGroundColors } from '../lib';
import { getCookie, setCookie } from 'cookies-next';
import { toast } from 'sonner';

export const useBackground = () => {
  const [bgColor, setBgColorState] = useState<BackGroundColors>(BackGroundColors.DEFAULT);

  useEffect(() => {
    const stored = getCookie('bgColor') as BackGroundColors;
    setBgColorState(stored);
  }, []);

  const setBgColor = (color: BackGroundColors) => {
    setBgColorState(color);
    setCookie('bgColor', color);
    toast.success('Refresh your page', {
      description: 'Changes may take some time to take effect'
    });
  };

  return { bgColor, setBgColor };
};
