import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { authCookieKey } from '@workspace/ui/lib/constants';
import { AuthUserRoles, FetchMethods } from '@workspace/ui/lib/enums';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Build forward headers
  const headers = new Headers(request.headers);
  headers.set('x-params', `${pathname}${search}`);
  headers.set('x-pathname', pathname);
  headers.set('x-search', search);

  const token = request.cookies.get(authCookieKey)?.value;

  // No token → allow auth pages but forward headers
  if (!token) return NextResponse.next({ request: { headers } });

  try {
    const verifyUrl = buildSafeUrl({ host: configService.NEXT_PUBLIC_API_URL, pathname: '/auth/verify' });

    const res = await fetch(verifyUrl, {
      body: JSON.stringify({ token }),
      method: FetchMethods.POST,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });

    // Invalid / expired token → stay on auth app
    if (!res.ok) return NextResponse.next({ request: { headers } });

    const { roles } = (await res.json()) as { roles?: string[] };
    const role = roles?.[0];

    if (!role) return NextResponse.next({ request: { headers } });

    switch (role) {
      case AuthUserRoles.ADMIN:
        return NextResponse.redirect(
          buildSafeUrl({
            host: configService.NEXT_PUBLIC_ADMIN_URL,
            pathname: '/home'
          })
        );

      case AuthUserRoles.CREATOR:
        return NextResponse.redirect(
          buildSafeUrl({
            host: configService.NEXT_PUBLIC_CREATOR_URL,
            pathname: '/studio'
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
    return NextResponse.next({ request: { headers } });
  }
}
