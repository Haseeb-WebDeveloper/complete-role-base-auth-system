import UserModel from "@/database/models/user.model";
import { hashPassword } from "@/lib/bscript";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { generateOTP } from "@/lib/generate-otp";
import { sendVerificationEmail } from "@/lib/send-mail";
import { verifyMailMessage } from "@/template";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ 
                success: false, 
                message: 'All fields are required' 
            }, { status: 400 });
        }

        await dbConnect();

        const existingUser = await UserModel.findOne({email});
        if (existingUser) {
            return NextResponse.json({ 
                success: false, 
                message: "Email already registered. Please use a different email or login" 
            }, { status: 400 });
        }
        
        const hashedPassword = await hashPassword(password);
        const verificationCode = generateOTP();
        
        // Create user first
        const user = await UserModel.create({ 
            name, 
            email, 
            password: hashedPassword,
            verificationCode
        });

        try {
            // Attempt to send verification email
            await sendVerificationEmail(email, verifyMailMessage(verificationCode));
        } catch (emailError) {
            // If email fails, delete the user and throw error
            await UserModel.deleteOne({ _id: user._id });
            console.error('Email sending error:', emailError);
            return NextResponse.json({ 
                success: false, 
                error: "Failed to send verification email. Please try again." 
            }, { status: 500 });
        }

        // Success response
        const userResponse = {
            name: user.name,    
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return NextResponse.json({ 
            success: true, 
            message: "User created successfully. Please check your email for verification.",
            user: userResponse
        }, { status: 201 });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ 
            success: false, 
            message: "Something went wrong. Please try again later."
        }, { status: 500 });
    }
}