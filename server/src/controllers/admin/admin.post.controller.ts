import type { RequestHandler } from "express"
import Comment from "../../models/Comment.ts"
import createHttpError from "http-errors"
import Post from "../../models/Post.ts"

export const getComments:RequestHandler = async  (req, res) => {
    const comment = await Comment.find({}).sort({createdAt: -1}).exec()
    res.json(comment)
}

export const deletePost:RequestHandler = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw createHttpError(404, "post not found")
        }
        if (req.user?.role !== "admin") {
            throw createHttpError(403, "unauthorized. ADMIN ONLY")
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
