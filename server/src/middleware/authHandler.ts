import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "../env.js";
import { type RequestHandler } from "express";
import createHttpError from 'http-errors';
import { type AuthUser } from "../types/AuthUser";
const JWT_SECRET = env.JWT_SECRET;

const authHandler:RequestHandler = async(req, res, next) => {
    const header = req.header("Authorization");
    if (!header) {
        throw createHttpError(401, "No token, authorization denied")
    }
    const token = header.split(" ")[1];
    if (!token) {
        throw createHttpError(401, "No token, authorization denied")
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET) as AuthUser;
        req.user = decode;
        next(); 
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token is not valid" });
    }
}

export default authHandler;
