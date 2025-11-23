import express from "express";
import * as authController from "../controllers/authController.ts"
const router = express.Router();

// ----------------register user-----------------

router.post("/register", authController.register);
// ----------------login user ---------------

router.post("/login", authController.login);

export default router;
