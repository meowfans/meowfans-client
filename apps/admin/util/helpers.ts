import { RefObject } from 'react';

export const handleScrollToTheEnd = (ref: RefObject<HTMLDivElement | null>) => {
  requestAnimationFrame(() => {
    ref.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  });
};

export const handleScrollToTheTop = (ref: RefObject<HTMLDivElement | null>) => {
  requestAnimationFrame(() => {
    ref.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
};

export const useCanonicalPathName = (pathname: string) => {
  switch (pathname) {
    case `/channels/${pathname}`:
      return '/channels';
    case `/assets/${pathname}`:
      return '/assets';
    case `/vaults/${pathname}`:
      return '/vaults';
    default:
      return pathname;
  }
};
