import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
    try {
        const accessToken = req.cookies.get('accessToken')?.value;

        if (!accessToken) {
            return NextResponse.json({ 
                success: false, 
                message: "No token provided" 
            }, { status: 401 });
        }

        const decoded = await verifyToken(accessToken) as { userId: string };

        // Your protected route logic here
        return NextResponse.json({ 
            success: true, 
            data: "This is protected data",
            userId: decoded.userId
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: "Invalid token" 
        }, { status: 401 });
    }
} 