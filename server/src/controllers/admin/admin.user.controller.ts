import { type RequestHandler } from "express";
import User from "../../models/User";

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await User.find().sort({createdAt: -1}).exec()
        res.json(users)
    } catch (error) {
        next(error)
    }
}