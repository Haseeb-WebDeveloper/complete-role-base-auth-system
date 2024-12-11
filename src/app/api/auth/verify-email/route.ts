import UserModel from "@/database/models/user.model";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest) {

    const { email, code } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" });
    }

    if (user) {
        if (user.verificationCode === code) {
            user.isVerified = true;
            user.verificationCode = "";
            await user.save();
            return NextResponse.json({ success: true, message: "Email verified successfully" });
        } else {
            return NextResponse.json({ success: false, message: "Invalid verification code" });
        }
    }
}