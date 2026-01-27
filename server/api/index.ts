import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import { isHttpError } from "http-errors";
import cors from "cors";
import authRoutes from "../src/routes/auth.js";
import blogRoutes from "../src/routes/post.js";
import userRoutes from "../src/routes/user.js";
import commentRoutes from "../src/routes/comment.js";
import adminUserRoutes from "../src/routes/admin/admin.user.routes.js";
import adminPostRoutes from "../src/routes/admin/admin.post.routes.js";
import adminCommentRoutes from "../src/routes/admin/admin.comment.routes.js";
import morgan from "morgan";
import { isAdmin } from "../src/middleware/isAdmin.js";
import auth from "../src/middleware/authHandler.js";
import { uptime } from "process";
import { connectDB } from "../src/db/connect_db.js";

const app = express();

// Connect to DB on cold start
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(503).json({ 
            error: 'Database connection failed',
            message: 'Service temporarily unavailable'
        });
    }
});
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/admin/user", auth, isAdmin, adminUserRoutes);
app.use("/api/admin/post", auth, isAdmin, adminPostRoutes);
app.use("/api/admin/comments", auth, isAdmin, adminCommentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/user", userRoutes);

app.get('/health', (_req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: uptime(),
        timestamp: Date.now()
    });
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An Unknown Error Occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

app.get("/", (req, res) => {
    res.send("Welcome to the Blog API");
});

export default app;