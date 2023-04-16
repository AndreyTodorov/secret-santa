export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/parties/:path*", "/participants/:path*"],
};
