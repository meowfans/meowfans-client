import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { authCookieKey } from '@workspace/ui/lib/constants';
import { UserRoles } from '@workspace/ui/lib/enums';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Build forward headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-params', `${pathname}${search}`);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-search', search);

  const accessToken = request.cookies.get(authCookieKey)?.value;

  // No token → allow auth pages but forward headers
  if (!accessToken) return NextResponse.next({ request: { headers: requestHeaders } });

  try {
    const verifyUrl = buildSafeUrl({ host: configService.NEXT_PUBLIC_API_URL, pathname: '/auth/verify' });

    const res = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify({ token: accessToken })
    });

    // Invalid / expired token → stay on auth app
    if (!res.ok) return NextResponse.next({ request: { headers: requestHeaders } });

    const { roles } = (await res.json()) as { roles?: string[] };
    const role = roles?.[0];

    if (!role) return NextResponse.next({ request: { headers: requestHeaders } });

    switch (role) {
      case UserRoles.ADMIN:
        return NextResponse.redirect(
          buildSafeUrl({
            host: configService.NEXT_PUBLIC_ADMIN_URL,
            pathname: '/vaults'
          })
        );

      case UserRoles.CREATOR:
        return NextResponse.redirect(
          buildSafeUrl({
            host: configService.NEXT_PUBLIC_CREATOR_URL,
            pathname: '/profile'
          })
        );

      default:
        return NextResponse.redirect(
          buildSafeUrl({
            host: configService.NEXT_PUBLIC_FAN_URL,
            pathname: '/dashboard'
          })
        );
    }
  } catch {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
}
