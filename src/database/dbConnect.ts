import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        console.log("Connecting to MongoDB");
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;