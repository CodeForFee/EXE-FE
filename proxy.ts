import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJWT } from '@/lib/utils/helper';

// Define public routes that don't require authentication
const publicPaths = [
    '/login',
    '/register',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/refresh',
    '/',
    '/products',
    '/combos',
    '/community',
    '/about',
];

// Define role-based route access
// Map URL prefixes to allowed roles
const rolePermissions: Record<string, string[]> = {
    '/admin': ['ADMIN'],
    '/dashboard/seller': ['ADMIN', 'STAFF'],
    '/dashboard/buyer': ['USER', 'ADMIN', 'STAFF'],
};

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if the path is public or Next.js internals
    if (
        publicPaths.some(path => pathname === path || pathname.startsWith(path)) ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/public') ||
        pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)
    ) {
        return NextResponse.next();
    }

    // 2. Get tokens from cookies
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // Case 2: No refresh token → Redirect to login
    if (!refreshToken) {
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // 3. Validate Access Token if it exists
    if (accessToken) {
        try {
            const user = decodeJWT<{ 
                role?: string; 
                roles?: string[];
                exp: number;
                userId?: string;
                sub?: string;
            }>(accessToken);

            // Check Token Expiration
            const currentTime = Math.floor(Date.now() / 1000);
            if (user.exp < currentTime) {
                // Token expired but refresh token exists
                // Delete access token cookie and redirect to same URL
                // This will trigger AuthContext to refresh the token
                const response = NextResponse.redirect(request.url);
                response.cookies.delete('accessToken');
                return response;
            }

            // Valid Token → Check Role-based Access (RBAC)
            const matchedPath = Object.keys(rolePermissions).find(path => 
                pathname.startsWith(path)
            );

            if (matchedPath) {
                const allowedRoles = rolePermissions[matchedPath];
                // Get user role from token
                const userRole = user.role || user.roles?.[0] || 'USER';

                if (!allowedRoles.some(role => userRole.includes(role))) {
                    // Unauthorized - redirect to home or unauthorized page
                    return NextResponse.redirect(new URL('/', request.url));
                }
            }

        } catch (error) {
            console.error("Token decoding failed:", error);
            // Invalid token structure → Force refresh flow
            const response = NextResponse.redirect(request.url);
            response.cookies.delete('accessToken');
            return response;
        }
    }

    // Case 3: No access token but has refresh token
    // Allow request to proceed
    // AuthContext will handle token refresh
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - api routes (except auth routes which are handled above)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
    ],
};
