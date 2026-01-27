import env from "../env.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { type RequestHandler } from "express";
import createHttpError from 'http-errors';

const JWT_SECRET = env.JWT_SECRET;

export const register: RequestHandler = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            res.status(400).json({ message: "Missing fields" });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            res.status(400).json({ message: "User already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = new User({ firstname, lastname, email, password: hashed, role: "user" });
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.firstname + user.lastname,
                role: user.role,
                email: user.email,
                profile: user.profilePic
            },
        });
    } catch (error) {
        next(error)
    }
}

export const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw createHttpError(404, "user not found")
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(404).json({ message: "Password does not match" });
        }

        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.firstname + user.lastname,
                role: user.role,
                email: user.email,
                profile: user.profilePic
            },
        });
    } catch (error) {
        next(error)
    }
}