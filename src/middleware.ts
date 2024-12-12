import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

// this is the middleware that will be used to check if the user is logged in. This is the first middleware that will be called when the user visits the website. In nextjs, the middleware is called before the page is rendered.
export async function middleware(request: NextRequest) {
    console.log("Middleware called for path:", request.nextUrl.pathname);
    
    // Paths that don't require authentication
    const publicPaths = [ '/', '/login', '/signup', '/forget-password', '/verify-email'];
    // this is the function that will be used to check if the path is public. It will take the public paths and the request path and check if the request path starts with any of the public paths.
    const isPublicPath = publicPaths.some(path => 
        request.nextUrl.pathname.startsWith(path)
    );

    // Get tokens from cookies
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    console.log("Tokens present:", { accessToken: !!accessToken, refreshToken: !!refreshToken });

    // If it's a public path and user has valid tokens, redirect to dashboard
    if (isPublicPath && accessToken) {
        try {
            await verifyToken(accessToken);
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } catch (error) {
            // Token is invalid, continue to public path
            console.log("Invalid access token on public path");
        }
    }

    // If it's not a public path and user doesn't have tokens, redirect to login
    if (!isPublicPath && !accessToken) {
        return NextResponse.redirect(
            new URL(`/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url)
        );
    }

    try {
        if (accessToken) {
            // Verify access token
            await verifyToken(accessToken);
            return NextResponse.next();
        }
    } catch (error) {
        console.log("Token verification failed, attempting refresh");
        // Token is invalid or expired
        if (refreshToken) {
            try {
                // Try to refresh the token
                const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
                    method: 'POST',
                    headers: {
                        'Cookie': `refreshToken=${refreshToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Return response with new tokens
                    const res = NextResponse.next();
                    res.cookies.set('accessToken', data.accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        path: '/',
                        maxAge: 3600
                    });
                    return res;
                }
            } catch (error) {
                console.error("Token refresh failed:", error);
            }
        }

        // If refresh failed or no refresh token, redirect to login
        return NextResponse.redirect(
            new URL(`/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url)
        );
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