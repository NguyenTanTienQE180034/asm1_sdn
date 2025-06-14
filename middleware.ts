import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        // Add any additional middleware logic here
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Protect create, edit routes
                if (
                    req.nextUrl.pathname.startsWith("/create") ||
                    req.nextUrl.pathname.startsWith("/edit") ||
                    (req.nextUrl.pathname.startsWith("/api/products") &&
                        req.method !== "GET")
                ) {
                    return !!token;
                }
                return true;
            },
        },
    }
);

export const config = {
    matcher: ["/create/:path*", "/edit/:path*", "/api/products/:path*"],
};
