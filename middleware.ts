import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  /* 미들웨어 정의 */
  // ...
  return NextResponse.next();
}
