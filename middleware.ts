import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '', // path I want to protect :/path* makes it dynamic

  // eg dashboard
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
