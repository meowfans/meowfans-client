import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-params', `${pathname}${search}`);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-search', search);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}
