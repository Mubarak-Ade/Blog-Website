import express from "express";
import auth from "../middleware/authHandler";
// import async from "../middleware/authHandler.js";
import multer from 'multer'
import * as postConroller from "../controllers/postController"
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/post/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
})

const upload = multer({storage})

// ----------------get all post ---------------


router.get("/all", postConroller.getFilterPost);
router.get("/", postConroller.getPosts);
router.get("/me", auth, postConroller.getUserPosts);

// ----------------get single post ---------------

router.get("/:id", postConroller.getPost);

// ----------------create a post ---------------

router.post("/", auth, upload.single("image"), postConroller.createPost);

// ----------------update/edit a post ---------------

router.put("/:id", auth, upload.single("image"), postConroller.updatePost);

// ----------------delete post ---------------

router.delete("/:id", auth, postConroller.deletePost);

// ----------------post a comment----------------


export default router;
