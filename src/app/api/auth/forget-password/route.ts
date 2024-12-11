import UserModel from "@/database/models/user.model";
import { generateOTP } from "@/lib/generate-otp";
import { sendVerificationEmail } from "@/lib/send-mail";
import { forgotPasswordMailMessage } from "@/template";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({
                success: false,
                message: "Please enter a valid email"
            }, { status: 400 });
        }

        await dbConnect();

        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "No account found with this email"
            }, { status: 404 });
        }

        const otp = generateOTP();
        
        // Update user with new OTP
        user.verificationCode = otp;
        await user.save();

        // Send email
        await sendVerificationEmail(email, forgotPasswordMailMessage(otp));

        return NextResponse.json({
            success: true,
            message: "Reset instructions sent to your email"
        }, { status: 200 });

    } catch (error) {
        console.error("Forget password error:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Something went wrong. Please try again later." 
        }, { status: 500 });
    }
} 