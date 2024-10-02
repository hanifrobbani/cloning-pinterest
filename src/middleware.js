import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const currentUrl = request.nextUrl.pathname;

  // Jika token ada dan user mencoba mengakses halaman login, redirect ke halaman utama
  if (token && currentUrl === "/user/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Jika token tidak ada, redirect ke halaman login
  if (!token && !currentUrl.startsWith("/user/login")) {
    const loginUrl = new URL("/user/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// menentukan route mana saja yang menggunakan middleware ini
export const config = {
  matcher: ["/", "/post", "/post/details/{id}", "/post/create", "/jelajah", "/user", "/user/login"],
};
