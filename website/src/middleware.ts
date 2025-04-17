import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isHomePage = request.nextUrl.pathname === '/spross';
  response.headers.set('x-is-home', isHomePage.toString());
  return response;
}

export const config = {
  matcher: '/:path*',
}; 