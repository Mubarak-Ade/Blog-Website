import express from "express";
import User from "../models/User.js";
const router = express.Router();
import multer from "multer";
import auth from "../middleware/authHandler.js";
import { uploadImage } from "../services/uploadService.js";

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.put("/me/edit", auth, upload.single("profilePic"), async (req, res) => {
    try {
        const updates = { ...req.body };

        if (req.file) {
            const imageUrl = uploadImage(req.file.buffer)
            updates.profilePic = imageUrl
        }

        updates.social = {
            x: req.body.x,
            facebook: req.body.facebook,
            linkedin: req.body.linkedin,
            instagram: req.body.instagram,
        };

        Object.keys(updates).forEach(
            (key) =>
                (updates[key] === undefined || updates[key] === "") &&
                delete updates[key]
        );

        const updated = await User.findByIdAndUpdate(
            req.user?.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password");

        res.json({ message: "Uploaded succesfull", updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user?.id);

        if (!user) {
            res.status(404).json({ message: "User info not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
