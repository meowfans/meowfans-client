import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { authCookieKey } from '@workspace/ui/lib/constants';
import { AuthPaths, UserRoles } from '@workspace/ui/lib/enums';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-params', `${pathname}${search}`);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-search', search);

  if (Object.values(AuthPaths).includes(pathname as AuthPaths)) {
    const accessToken = request.cookies.get(authCookieKey)?.value;
    if (accessToken) {
      try {
        const verifyUrl = buildSafeUrl({ host: configService.NEXT_PUBLIC_API_URL, pathname: '/auth/verify' });
        const creatorAppUrl = buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/profile' });
        const fanAppUrl = buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' });
        const adminAppUrl = buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL, pathname: '/vaults' });

        const res = await fetch(verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: accessToken })
        });

        if (res.ok) {
          const data = (await res.json()) as { roles?: string[] };
          const role = data?.roles?.[0];

          switch (role) {
            case UserRoles.ADMIN:
              return NextResponse.redirect(adminAppUrl);
            case UserRoles.CREATOR:
              return NextResponse.redirect(creatorAppUrl);
            case UserRoles.FAN:
              return NextResponse.redirect(fanAppUrl);
            default:
              return NextResponse.redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL }));
          }
        }
      } catch {
        return NextResponse.redirect(pathname);
      }
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}
