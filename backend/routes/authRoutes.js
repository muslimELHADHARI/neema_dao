import express from "express"
import { register, login, forgotPassword, resetPassword, verifyEmail } from "../controllers/authController.js"

const router = express.Router()

// Auth routes
router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.post("/verify-email", verifyEmail)

export default router
