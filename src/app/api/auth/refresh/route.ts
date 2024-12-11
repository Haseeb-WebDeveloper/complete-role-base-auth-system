import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, generateToken } from "@/lib/jwt";
import UserModel from "@/database/models/user.model";
import dbConnect from "@/database/dbConnect";

export async function POST(req: NextRequest) {
    try {
        const refreshToken = req.cookies.get('refreshToken')?.value;

        if (!refreshToken) {
            return NextResponse.json({ 
                success: false, 
                message: "No refresh token provided" 
            }, { status: 401 });
        }

        // Verify refresh token
        const decoded = await verifyRefreshToken(refreshToken) as { userId: string };
        
        await dbConnect();
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return NextResponse.json({ 
                success: false, 
                message: "User not found" 
            }, { status: 404 });
        }

        // Generate new access token
        const accessToken = generateToken({ userId: user._id }, '1h');

        // Create response with new access token
        const response = NextResponse.json({ 
            success: true, 
            accessToken 
        }, { status: 200 });

        // Set new access token cookie
        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return response;

    } catch (error) {
        console.error('Refresh token error:', error);
        return NextResponse.json({ 
            success: false, 
            message: "Invalid refresh token" 
        }, { status: 401 });
    }
} 