import express from "express";
const router = express.Router()
import * as commentController from "../controllers/commentController.js"
import auth from "../middleware/authHandler.js"

router.post("/:postId", auth, commentController.postComment);

router.get("/:postId", commentController.getPostComments)
router.get("/", auth, commentController.getUserPostComments)

export default router;
