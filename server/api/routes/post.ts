import express from "express";
import auth from "../middleware/authHandler.js";
// import async from "../middleware/authHandler.js";
import multer from 'multer'
import * as postConroller from "../controllers/postController.js"
const router = express.Router();

// ----------------get all post ---------------


router.get("/all", postConroller.getFilterPost);
router.get("/", postConroller.getPosts);
router.get("/me", auth, postConroller.getUserPosts);

// ----------------get single post ---------------

router.get("/:id", postConroller.getPost);

// ----------------create a post ---------------

router.post("/", auth, postConroller.createPost);

// ----------------update/edit a post ---------------

router.put("/:id", auth, postConroller.updatePost);

// ----------------delete post ---------------

router.delete("/:id", auth, postConroller.deletePost);

// ----------------post a comment----------------


export default router;
