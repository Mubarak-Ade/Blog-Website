import express from 'express';
import * as postController from '../../controllers/postController.js';
import * as adminPostController from "../../controllers/admin/admin.post.controller.js"

const router = express.Router()

router.get("/", postController.getPosts)
router.delete("/:id", adminPostController.deletePost)
// router.get("/comment")

export default router