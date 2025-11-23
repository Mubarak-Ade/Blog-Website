import "dotenv/config"
import express, { type NextFunction, type Request, type Response } from "express";
import {isHttpError} from "http-errors"
import cors from "cors"
import authRoutes from "./routes/auth.ts"
import blogRoutes from "./routes/post.ts"
import userRoutes from "./routes/user.ts"
import commentRoutes from "./routes/comment.ts"
import adminUserRoutes from "./routes/admin/admin.user.routes.ts" 
import adminPostRoutes from "./routes/admin/admin.post.routes.ts" 
import adminCommentRoutes from "./routes/admin/admin.comment.routes.ts"
import {fileURLToPath} from "url"
import path from "path"
import morgan from "morgan";
import { isAdmin } from "./middleware/isAdmin.ts";
import auth from "./middleware/authHandler.ts";

const app = express();

app.use(morgan("dev"))

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join((__dirname, "uploads"))));

app.use("/api/admin/user", auth, isAdmin, adminUserRoutes)

app.use("/api/admin/post", auth, isAdmin, adminPostRoutes)
app.use("/api/admin/comment", auth, isAdmin, adminCommentRoutes)

app.use("/api/auth", authRoutes)
app.use("/api/posts", blogRoutes)
app.use("/api/posts", commentRoutes)
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

export default app