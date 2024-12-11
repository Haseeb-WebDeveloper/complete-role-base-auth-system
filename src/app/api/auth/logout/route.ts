import { NextResponse } from "next/server";

export async function POST() {
    console.log("Logout endpoint called");
    
    const response = NextResponse.json({
        success: true,
        message: "Logged out successfully"
    });

    // Clear cookies
    response.cookies.set('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0
    });

    response.cookies.set('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0
    });

    console.log("Cookies cleared");
    return response;
} 