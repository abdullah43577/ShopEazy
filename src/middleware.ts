import { NextRequest, NextResponse } from "next/server";
import { JwtPayload, jwtDecode } from "jwt-decode";

const protectedRoutes = ["/profile", "/checkout"];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("shopEazyJWT")?.value;
  const absoluteLoginURL = new URL("/login", req.nextUrl.origin);

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) return NextResponse.redirect(absoluteLoginURL);

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);

      // Check if the token has expired
      const currentTime = Date.now() / 1000;
      if (!decodedToken.exp || decodedToken.exp < currentTime) {
        return NextResponse.redirect(absoluteLoginURL);
      }

      // Proceed with the request if the token is valid
      return NextResponse.next();
    } catch (error) {
      // Redirect to login page if token is invalid
      return NextResponse.redirect(absoluteLoginURL);
    }
  }

  // Allow the request to continue for unprotected routes
  return NextResponse.next();
}
