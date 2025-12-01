import express from "express";
const router = express.Router()
import * as commentController from "../controllers/commentController"
import auth from "../middleware/authHandler"

router.post("/comment/:postId", auth, commentController.postComment);

router.get("/comments", auth, commentController.getComments)

export default router;
