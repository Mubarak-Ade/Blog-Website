import express from "express";
import Post from "../models/Post.js";
import auth from "../middleware/authHandler.js";
import Comment from "../models/Comment.js";
import async from "../middleware/authHandler.js";
import multer from 'multer'
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/post/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
})

const upload = multer({storage})

// ----------------get all post ---------------

router.get("/", auth, async (req, res) => {
    try {
        const post = await Post.find({})
            .sort({
                createdAt: -1,
            })
            .populate("author", "firstname lastname email profilePic");
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/me", auth, async (req, res) => {
    try {
        const post = await Post.find({author: req.user.id})
            .sort({
                createdAt: -1,
            })
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// ----------------get single post ---------------

router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "firstname lastname email profilePic");
        const comment = await Comment.find({ post: post._id }).populate("user", "firstname lastname email profilePic");
        if (!post) {
            res.status(404).json({ message: "Post not found" });
        }
        res.json({ post, comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// ----------------create a post ---------------

router.post("/", auth, upload.single("post"), async (req, res) => {
    let { title, content, tags, category, image} = req.body;

    if (req.file) {
        image = `uploads/post/${req.file.filename}`
    }

    if (!title || !content || !tags || !category) {
        res.status(400).json({ message: "Fields are missing" });
    }

    const post = new Post({
        author: req.user.id,
        title,
        content,
        tags,
        category,
        image
    });
    await post.save();

    res.json({ post: { title, content, tags, category } });
});

// ----------------update/edit a post ---------------

router.put("/:id", auth, upload.single("post"), async (req, res) => {
    try {
        let { title, content, category, tags, image } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== req.user.id) {
            res.status(400).json({ message: "UnAuthorize" });
        }

        if (req.file) {
            post.image = `uploads/post/${req.file.filename}`
        }

        post.title = title ?? post.title;
        post.content = content ?? post.content;
        post.category = category ?? post.category;
        post.tags = tags ?? post.tags
        await post.save();
        res.json({
            message: "updated successfully",
            title: post.title,
            content: post.content,
            category: post.category,
            image: post.image
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ----------------delete post ---------------

router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== req.user.id) {
            res.status(400).json({ message: "UnAuthorize" });
        }
        await post.deleteOne();
        res.json({
            message: "Post deleted",
            post: {
                id: post._id,
                title: post.title,
                content: post.content,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ----------------post a comment----------------

router.post("/comment/:postId", auth, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            res.status(400).json({ message: "Field is empty" });
        }
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
        }
        // if (post.author.toString() !== req.user.id) {
        //     res.status(401).json({ messsage: "Not Authorize" });
        // }
        const comment = new Comment({ text, post: post._id, user: req.user.id });
        await comment.save();

        res.json({
            postId: post._id,
            author: post.author,
            title: post.title,
            content: post.content,
            comment: text,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/comments", auth, async  (req, res) => {
    const comment = await Comment.find({user: req.user.id}).populate({path})
})

export default router;
