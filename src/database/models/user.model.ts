import mongoose from "mongoose";
import type { User } from "@/types/user.interface";

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "author", "user"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["active", "inactive"], 
        default: "active"
    }
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;