'use server';

import { configService } from '@/util/config';
import { UserRoles } from '@workspace/gql/generated/graphql';
import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';
import { BearerAccessToken } from '@workspace/ui/lib';

export async function getAuthStatus() {
  try {
    const url = new URL(configService.NEXT_PUBLIC_API_URL);
    url.pathname = '/auth/verify';

    // Note: We need to figure out how to get the Bearer token on the server.
    // Usually it's from cookies. BearerAccessToken(UserRoles.Fan) in UI lib might use getCookie.

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: BearerAccessToken(UserRoles.Fan)
      }
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    serverErrorHandler({ error, context: 'GetAuthStatus' });
    return null;
  }
}
