import express from "express";
const router = express.Router()
import * as commentController from "../controllers/commentController.ts"
import auth from "../middleware/authHandler.ts"

router.post("/comment/:postId", auth, commentController.postComment);

router.get("/comments", auth, commentController.getComments)

export default router;
