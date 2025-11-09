import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export default function async(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode;
        next(); 
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token is not valid" });
    }
}
