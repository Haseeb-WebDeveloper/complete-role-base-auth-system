import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import UserModel from "@/database/models/user.model";
import dbConnect from "@/database/dbConnect";

export async function GET(req: NextRequest) {
    try {
        const accessToken = req.cookies.get('accessToken')?.value;

        if (!accessToken) {
            return NextResponse.json({ 
                success: false, 
                message: "Not authenticated" 
            }, { status: 401 });
        }

        const decoded = await verifyToken(accessToken) as { userId: string };
        
        await dbConnect();
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return NextResponse.json({ 
                success: false, 
                message: "User not found" 
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: "Invalid token" 
        }, { status: 401 });
    }
} 