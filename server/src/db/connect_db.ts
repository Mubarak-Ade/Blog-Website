import mongoose from "mongoose";
import env from "../env.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_DEV_URI || env.MONGO_PROD_URI);
        console.log("MongoDb Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

