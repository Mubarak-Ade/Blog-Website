import "dotenv/config"
import express, { type NextFunction, type Request, type Response } from "express";
import {isHttpError} from "http-errors"
import cors from "cors"
import authRoutes from "./routes/auth"
import blogRoutes from "./routes/post"
import userRoutes from "./routes/user"
import commentRoutes from "./routes/comment"
import adminUserRoutes from "./routes/admin/admin.user.routes" 
import adminPostRoutes from "./routes/admin/admin.post.routes" 
import adminCommentRoutes from "./routes/admin/admin.comment.routes"
import {fileURLToPath} from "url"
import path from "path"
import morgan from "morgan";
import { isAdmin } from "./middleware/isAdmin";
import auth from "./middleware/authHandler";

const app = express();

app.use(morgan("dev"))

app.use(cors());
app.use(express.json());

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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