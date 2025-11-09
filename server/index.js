import "./env.js"
import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import {connectDB} from "./db/connect_db.js"
import authRoutes from "./routes/auth.js"
import blogRoutes from "./routes/blog.js"
import userRoutes from "./routes/user.js"
import {fileURLToPath} from "url"
import path from "path"

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join((__dirname, "uploads"))));

app.use("/api/auth", authRoutes)
app.use("/api/posts", blogRoutes)
app.use("/api/user", userRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Sever Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
