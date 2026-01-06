import "dotenv/config"
import express, { type NextFunction, type Request, type Response } from "express";
import {isHttpError} from "http-errors"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import blogRoutes from "./routes/post.js"
import userRoutes from "./routes/user.js"
import commentRoutes from "./routes/comment.js"
import adminUserRoutes from "./routes/admin/admin.user.routes.js" 
import adminPostRoutes from "./routes/admin/admin.post.routes.js" 
import adminCommentRoutes from "./routes/admin/admin.comment.routes.js"
import {fileURLToPath} from "url"
import path from "path"
import morgan from "morgan";
import { isAdmin } from "./middleware/isAdmin.js";
import auth from "./middleware/authHandler.js";
import { uptime } from "process";

const app = express();

app.use(morgan("dev"))

app.use(cors());
app.use(express.json());

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/admin/user", auth, isAdmin, adminUserRoutes)

app.use("/api/admin/post", auth, isAdmin, adminPostRoutes)
app.use("/api/admin/comments", auth, isAdmin, adminCommentRoutes)

app.use("/api/auth", authRoutes)
app.use("/api/posts", blogRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/user", userRoutes)

app.use((error: unknown, req: Request, res: Response, next: NextFunction) =>
{
    console.error(error)
    let errorMessage = "An Unknown Error Occured"
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message
    }
    res.status(statusCode).json({ error: errorMessage })
})

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: uptime(),
    timestamp: Date.now(),
  });
});

export default app
