import express from 'express';
import * as commentController from "../../controllers/admin/admin.comment.controller.ts"
import authHandler from '../../middleware/authHandler.ts';

const router = express.Router()

router.get("/", commentController.getComments)


export default router