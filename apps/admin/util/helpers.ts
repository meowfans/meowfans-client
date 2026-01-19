import { authRefreshCookieKey, impersonatedCreatorId } from '@workspace/ui/lib';
import { JwtUser } from '@workspace/ui/lib/types';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { RefObject } from 'react';
import { configService } from './config';

export const BearerRefreshToken = () => {
  return `Bearer ${getCookie(authRefreshCookieKey)}`;
};

export const ImpersonatedCreatorID = (creatorId: string) => {
  return creatorId === getCookie(impersonatedCreatorId);
};

export const buildSafeUrl = (input: { host: string; pathname?: string }) => {
  try {
    const redirectUrl = new URL(input.host);
    redirectUrl.pathname = input.pathname || '/';
    return redirectUrl.toString();
  } catch {
    console.log('Failed to create url!');
    return configService.NEXT_PUBLIC_CREATOR_URL;
  }
};

export const decodeJwtToken = (token?: string): JwtUser | null => {
  try {
    if (!token) return null;
    return jwtDecode(token);
  } catch {
    return null;
  }
};

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

const handleFormatNumberToKAndM = (digit: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(digit);
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
