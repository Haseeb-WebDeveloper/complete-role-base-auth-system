import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/database/models/user.model";
import dbConnect from "@/database/dbConnect";
import { generateToken, generateRefreshToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    try {
        const { email, code } = await req.json();

        if (!email || !code) {
            return NextResponse.json({
                success: false,
                message: "Email and verification code are required"
            }, { status: 400 });
        }

        await dbConnect();
        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        if (user.verificationCode !== code) {
            return NextResponse.json({
                success: false,
                message: "Invalid verification code"
            }, { status: 400 });
        }

        // Update user verification status
        user.isVerified = true;
        user.verificationCode = "";
        await user.save();

        // Generate tokens
        const accessToken = generateToken({ userId: user._id }, '1h');
        const refreshToken = generateRefreshToken({ userId: user._id });

        // Create response
        const response = NextResponse.json({
            success: true,
            message: "Email verified successfully",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }, { status: 200 });

        // Set cookies
        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return response;

    } catch (error) {
        console.error("Email verification error:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, { status: 500 });
    }
}