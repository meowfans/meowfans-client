'use client';

import { useEffect, useState } from 'react';
import { BackGroundColors } from '../lib';
import { getCookie, setCookie } from 'cookies-next';

export const useBackground = () => {
  const [bgColor, setBgColorState] = useState<BackGroundColors>(BackGroundColors.DEFAULT);

  useEffect(() => {
    const stored = getCookie('bgColor') as BackGroundColors;
    setBgColorState(stored);
  }, []);

  const setBgColor = (color: BackGroundColors) => {
    setBgColorState(color);
    setCookie('bgColor', color);
  };

  return { bgColor, setBgColor };
};
