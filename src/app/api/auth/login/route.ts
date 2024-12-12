import UserModel from "@/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/lib/bscript";
import dbConnect from "@/database/dbConnect";
import { generateRefreshToken, generateToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        console.log("Login attempt for:", email);

        if (!email || !password) {
            return NextResponse.json({ 
                success: false, 
                message: "Email and password are required" 
            }, { status: 400 });
        }

        await dbConnect();
        const user = await UserModel.findOne({ email });
        console.log("User found:", user ? "Yes" : "No");

        if (!user) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid email or password" 
            }, { status: 400 });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return NextResponse.json({ 
                success: false, 
                message: "Please verify your email before logging in" 
            }, { status: 400 });
        }

        // Check password
        const isPasswordValid = await comparePassword(password, user.password);
        
        if (!isPasswordValid) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid email or password" 
            }, { status: 400 });
        }

        const accessToken = generateToken({ userId: user._id });
        const refreshToken = generateRefreshToken({ userId: user._id });
        console.log("Tokens generated:", { accessToken: !!accessToken, refreshToken: !!refreshToken });

        // Create response with cookies
        const response = NextResponse.json({ 
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }, { status: 200 });

        // Set cookies with proper options
        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 3600
        });
        
        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 3600
        });

        console.log("Response cookies set:", response.cookies);
        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}