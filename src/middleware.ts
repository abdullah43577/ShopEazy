import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from './components/utils/isAuthenticated';

const protectedRoutes = [
  '/test',
  // "/dashboard",
  // "/dashbaord/screeners",
  // "/dashboard/countries",
  // "/dashboard/sector",
  // "/dashboard/esg",
];

export default function middleware(req: NextRequest) {
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL);
  }

  return NextResponse.next();
}
