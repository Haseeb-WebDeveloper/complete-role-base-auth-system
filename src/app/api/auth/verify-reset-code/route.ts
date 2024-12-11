import UserModel from "@/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import jwt from 'jsonwebtoken';

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

        // Generate a reset token
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        );

        // Clear the verification code
        user.verificationCode = "";
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Code verified successfully",
            token: resetToken
        }, { status: 200 });

    } catch (error) {
        console.error("Verify reset code error:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong. Please try again later."
        }, { status: 500 });
    }
} 