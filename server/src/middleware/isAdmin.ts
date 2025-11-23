import type { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({message: "Unauthorized"})
    }
    if (req.user.role !== "admin") {
        return res.status(401).json({message: "Forbidden. Admin only"})
    }

    next()
}