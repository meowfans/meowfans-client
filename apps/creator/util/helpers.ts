import { authenticatedPaths } from '@/lib/constants';

export const getAuthenticatedPath = (pathname: string) => {
  return (
    !authenticatedPaths.includes(pathname) &&
    !pathname.startsWith('/channels') &&
    !pathname.startsWith('/studio') &&
    !pathname.startsWith('/assets') &&
    !pathname.startsWith('/profile')
  );
};
