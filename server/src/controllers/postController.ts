import { type RequestHandler } from "express";
import Post from "../models/Post.ts";
import createHttpError from "http-errors"
import Comment from "../models/Comment.ts";


export const getPosts:RequestHandler = async (req, res, next) => {
    try {
        const post = await Post.find({})
            .sort({
                createdAt: -1,
            })
            .populate("author", "firstname lastname email profilePic");
        res.json(post);
    } catch (error) {
        next(error)
    }
}

export const getUserPosts:RequestHandler = async (req, res,next) => {
    try {
        const post = await Post.find({author: req.user?.id})
            .sort({
                createdAt: -1,
            })
        res.json(post);
    } catch (error) {
        next(error)
    }
}

export const getPost:RequestHandler = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "firstname lastname email profilePic");
        if (!post) {
            throw createHttpError(404, "post not found")
        }
        const comment = await Comment.find({ post: post._id }).populate("user", "firstname lastname email profilePic");
        if (!comment) {
            throw createHttpError(404, "post not found")
        }
        res.json({ post, comment });
    } catch (error) {
        next(error)
    }
}

export const createPost:RequestHandler = async (req, res) => {
    let { title, content, tags, category, image} = req.body;

    if (req.file) {
        image = `uploads/post/${req.file.filename}`
    }

    if (!title || !content || !tags || !category) {
        res.status(400).json({ message: "Fields are missing" });
    }

    const post = new Post({
        author: req.user?.id,
        title,
        content,
        tags,
        category,
        image
    });
    await post.save();

    res.json({ post: { title, content, tags, category } });
}

export const updatePost:RequestHandler = async (req, res, next) => {
    try {
        let { title, content, category, tags, image } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw createHttpError(404, "post not found")
        }
        if (post.author.toString() !== req.user?.id) {
            throw createHttpError(403, "unauthorize, you are not allowed to update this post")
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
        next(error)
    }
}

export const deletePost:RequestHandler = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw createHttpError(404, "post not found")
        }
        if (post.author.toString() !== req.user?.id) {
            throw createHttpError(403, "unauthorize, you are not allowed to delete this post")
        }
        await Post.findByIdAndDelete(req.params.id)
        res.json({
            message: "Post deleted",
            post: {
                id: post._id,
                title: post.title,
                content: post.content,
            },
        });
    } catch (error) {
        next(error)
    }
}