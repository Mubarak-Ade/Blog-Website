import express from 'express';
import * as userController from "../../controllers/admin/admin.user.controller.ts"

const router = express.Router()

router.get("/", userController.getUsers)

// router.get("/", )

export default router