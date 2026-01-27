import { type RequestHandler } from "express"
import Comment from "../../models/Comment.js"

export const getComments:RequestHandler = async  (req, res) => {
    const comment = await Comment.find({}).sort({createdAt: -1}).exec()
    res.json(comment)
}