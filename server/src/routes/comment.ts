import express from "express";
const router = express.Router()
import * as commentController from "../controllers/commentController.js"
import auth from "../middleware/authHandler.js"

router.post("/comment/:postId", auth, commentController.postComment);

router.get("/comments", auth, commentController.getComments)

export default router;
