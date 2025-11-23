import mongoose from "mongoose";
import env from "../../env.ts";

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_PROD_URI);
        console.log("MongoDb Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

