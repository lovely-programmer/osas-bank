import { NextResponse } from "next/server";
import { getSession } from "./lib/lib";

export async function middleware(request) {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboad",
    "/contact",
    "/deposit",
    "/settings",
    "/transactions",
    "/transfer",
  ],
};
