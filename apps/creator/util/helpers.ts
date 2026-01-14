import { authenticatedPaths } from '@/lib/constants';

export const isAuthenticatedPath = (pathname: string) => {
  return authenticatedPaths.some((path) => pathname.startsWith(path));
};
