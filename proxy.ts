import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk attaches verified session context here. Authorization is deliberately
// enforced inside each protected page/API so route matching cannot drift from
// the resource that performs the sensitive operation.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/editorial/manage/:path*",
    "/api/editorial/reviews/:path*",
  ],
};
