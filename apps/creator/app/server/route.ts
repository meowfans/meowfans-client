import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing url', { status: 400 });

  const upstream = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'image/*'
    }
  });

  if (!upstream.ok) return new NextResponse('Upstream fetch failed', { status: 502 });

  const contentType = upstream.headers.get('content-type') ?? 'image/jpeg';

  const buffer = await upstream.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
