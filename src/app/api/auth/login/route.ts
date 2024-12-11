import UserModel from "@/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/lib/bscript";
import dbConnect from "@/database/dbConnect";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ 
                success: false, 
                message: "Email and password are required" 
            }, { status: 400 });
        }

        // Connect to database
        await dbConnect();

        const user = await UserModel.findOne({ email });

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

        // Create user response without sensitive data
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        };

        return NextResponse.json({ 
            success: true, 
            message: "Login successful",
            user: userResponse
        }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Something went wrong. Please try again later." 
        }, { status: 500 });
    }
}