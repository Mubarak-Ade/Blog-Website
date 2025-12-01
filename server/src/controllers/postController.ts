import { type RequestHandler } from "express";
import Post from "../models/Post";
import createHttpError from "http-errors"
import Comment from "../models/Comment";
import User from "../models/User";


export const getFilterPost: RequestHandler = async (req, res, next) => {
    try {
        const { page = 1, limit = 5, category, author, search, tags } = req.query

        const query: any = {}

        if (category) query.category = {$regex: category, $options: "i"}
        if(tags) query.tags = {$in: tags, $options: "i"}
        const authorName = [{firstname: {$regex: author, $options: "i"}}, {lastname: {$regex: author, $options: "i"}}]
        if (author) {
            const users = await User.find({$or: authorName}).select("_id")
            const ids = users.map(u => u._id)
            query.author = {$in: ids}
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ]
        }

        const skip = (Number(page) - 1) * Number(limit)
        const [data, total] = await Promise.all([Post.find(query).populate("author", "firstname lastname email profilePic").skip(skip).limit(Number(limit)), Post.countDocuments(query)])

        res.json({ total, page: Number(page), pages: Math.ceil(total / Number(limit)), data })
    } catch (error) {
        next(error)
    }
}

export const getPosts: RequestHandler = async (req, res, next) => {
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

export const getUserPosts: RequestHandler = async (req, res, next) => {
    try {
        const post = await Post.find({ author: req.user?.id })
            .sort({
                createdAt: -1,
            })
        res.json(post);
    } catch (error) {
        next(error)
    }
}

export const getPost: RequestHandler = async (req, res, next) => {
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

export const createPost: RequestHandler = async (req, res) => {
    const { title, content, tags, category } = req.body;
    let image;

    if (req.file) {
        image = `uploads/post/${req.file.filename}`
    }

    if (!title || !content || !tags || !category) {
        throw createHttpError(400, "Fields are missing")
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

export const updatePost: RequestHandler = async (req, res, next) => {
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
        if(tags) {

            post.tags = Array.isArray(tags) ? tags : tags.split(",").map((t:string) => t.trim())
        }
        await post.save();
        res.json({
            message: "updated successfully",
            title: post.title,
            content: post.content,
            category: post.category,
            image: post.image,
            posts: post.tags,
        });
    } catch (error) {
        next(error)
    }
}

export const deletePost: RequestHandler = async (req, res, next) => {
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