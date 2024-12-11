import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("Using existing database connection");
            return;
        }
        
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connected to MongoDB successfully");
        
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

export default dbConnect;