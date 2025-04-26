import express from "express"
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getUserBadges,
} from "../controllers/userController.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.get("/", getUsers)
router.get("/:id", getUserById)

// Protected routes
router.use(authenticate)
router.get("/profile/me", getUserProfile)
router.put("/profile/me", updateUserProfile)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)
router.get("/badges/me", getUserBadges)

export default router
