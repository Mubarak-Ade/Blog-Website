import express from 'express';
import * as commentController from "../../controllers/admin/admin.comment.controller.js";
const router = express.Router();
router.get("/", commentController.getComments);
export default router;
