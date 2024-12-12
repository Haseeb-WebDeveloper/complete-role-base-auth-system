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

        // Generate tokens. Access token is used to authenticate the user and refresh token is used to refresh the access token.
        const accessToken = generateToken({ userId: user._id });
        const refreshToken = generateRefreshToken({ userId: user._id });

        // here we are sending the access token and the refresh token to the client. The access token is used to authenticate the user and the refresh token is used to refresh the access token.
        const response = NextResponse.json({
            success: true,
            message: "Email verified successfully",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }, { status: 200 });

        // Set cookies for the access token and the refresh token in the response. The purpose of the cookies is to store the access token and the refresh token in the client's browser. In this code we are setting the cookies in the response.
        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
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