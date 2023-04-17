export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/secret-santa/:path*", "/food-tracker/:path*"],
};
