import UserModel from "@/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { hashPassword } from "@/lib/bscript";
import { verifyResetToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    try {
        const { email, password, token } = await req.json();

        if (!email || !password || !token) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 });
        }

        // Verify token
        try {
            const decoded = verifyResetToken(token) as { userId: string };
            console.log(decoded, "decoded");
            console.log(token, "token");
            if (!decoded.userId) {
                return NextResponse.json({
                    success: false,
                    message: "Invalid or expired reset token"
                }, { status: 400 });
            }
        } catch (error) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired reset token"
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

        // Hash the new password
        const hashedPassword = await hashPassword(password);
        
        // Update user's password
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Password updated successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong. Please try again later."
        }, { status: 500 });
    }
} 