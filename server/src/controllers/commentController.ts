import { type RequestHandler } from "express";
import Comment from "../models/Comment.ts";
import Post from "../models/Post.ts";
import createHttpError from "http-errors";

interface CommentBody {
    text: string
}

interface PostParams {
    postId?: string
}

export const postComment: RequestHandler<PostParams, unknown, CommentBody, unknown> = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { postId } = req.params;
        if (!text) {
            res.status(400).json({ message: "Field is empty" });
        }
        const post = await Post.findById(postId);
        if (!post) {
                    throw createHttpError(404, "post not found")
                }
        // if (post.author.toString() !== req.user.id) {
        //     res.status(401).json({ messsage: "Not Authorize" });
        // }
        const comment = new Comment({ text, post: post._id, user: req.user?.id });
        await comment.save();

        res.json({
            postId: post._id,
            author: post.author,
            title: post.title,
            content: post.content,
            comment: text,
        });
    } catch (error) {
        next(error)
    }
}

export const getComments:RequestHandler = async  (req, res) => {
    const comment = await Comment.find({user: req.user?.id})
}