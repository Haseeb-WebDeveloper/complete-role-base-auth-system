import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

// Define public paths that don't require authentication
const PUBLIC_PATHS = [
    '/',
    '/login',
    '/signup',
    '/forget-password',
    '/verify-email',
    '/documentation'
];

// Define API paths that should be excluded from middleware
const EXCLUDED_PATHS = [
    '/api/auth',
    '/_next/static',
    '/_next/image',
    '/favicon.ico',
    '/public'
];

/**
 * Checks if the given path is public
 * @param pathname - The path to check
 * @returns boolean indicating if the path is public
 */
const isPublicPath = (pathname: string): boolean => {
    return PUBLIC_PATHS.some(path => pathname.startsWith(path));
};

/**
 * Checks if the path should be excluded from middleware
 * @param pathname - The path to check
 * @returns boolean indicating if the path should be excluded
 */
const isExcludedPath = (pathname: string): boolean => {
    return EXCLUDED_PATHS.some(path => pathname.startsWith(path));
};

/**
 * Handles token refresh
 * @param request - The incoming request
 * @returns NextResponse with new tokens or null if refresh failed
 */

// this function is used to refresh the access token. it will send the refresh token to the server and the server will generate a new access token and return it to the client.
async function handleTokenRefresh(request: NextRequest): Promise<NextResponse | null> {
    try {
        const refreshToken = request.cookies.get('refreshToken')?.value;
        if (!refreshToken) return null;

        const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
            method: 'POST',
            headers: {
                'Cookie': `refreshToken=${refreshToken}` // this is the cookie that will be sent to the server that contains the refresh token.
            }
        });

        if (response.ok) {
            const data = await response.json();
            const res = NextResponse.next();
            
            // Set new access token in the response cookies.
            res.cookies.set('accessToken', data.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 3600 // 1 hour
            });

            return res;
        }
        return null;
    } catch (error) {
        console.error('Token refresh failed:', error);
        return null;
    }
}

/**
 * Creates a redirect response to the login page
 * @param request - The incoming request
 * @returns NextResponse redirect to login
 */
function createLoginRedirect(request: NextRequest): NextResponse {
    const redirectUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(
        new URL(`/login?redirect=${redirectUrl}`, request.url)
    );
}

/**
 * Main middleware function
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for excluded paths
    if (isExcludedPath(pathname)) {
        return NextResponse.next();
    }

    // Get tokens from cookies
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // Log request details (remove in production or add proper logging)
    console.log({
        path: pathname,
        isPublic: isPublicPath(pathname),
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken
    });

    // Handle public paths
    if (isPublicPath(pathname)) {
        // Redirect authenticated users from public pages to dashboard
        if (accessToken) {
            try {
                await verifyToken(accessToken);
                return NextResponse.redirect(new URL('/dashboard', request.url));
            } catch (error) {
                // Token is invalid, continue to public path
                console.log("Invalid access token on public path");
            }
        }
        return NextResponse.next();
    }

    // Handle protected paths
    if (!accessToken) {
        return createLoginRedirect(request);
    }

    try {
        // Verify access token
        await verifyToken(accessToken);
        return NextResponse.next();
    } catch (error) {
        console.log("Access token verification failed, attempting refresh");
        
        // Attempt token refresh
        const refreshResponse = await handleTokenRefresh(request);
        if (refreshResponse) {
            return refreshResponse;
        }

        // If refresh failed, redirect to login
        return createLoginRedirect(request);
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api/auth (authentication endpoints)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
    ],
}; 