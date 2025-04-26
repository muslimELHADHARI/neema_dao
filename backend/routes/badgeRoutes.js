import express from "express"
import {
  getBadges,
  getBadgeById,
  createBadge,
  updateBadge,
  deleteBadge,
  awardBadgeToUser,
  getUserBadgeProgress,
} from "../controllers/badgeController.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.get("/", getBadges)
router.get("/:id", getBadgeById)

// Protected routes
router.use(authenticate)
router.post("/", createBadge)
router.put("/:id", updateBadge)
router.delete("/:id", deleteBadge)
router.post("/award/:userId/:badgeId", awardBadgeToUser)
router.get("/progress/:userId", getUserBadgeProgress)

export default router
