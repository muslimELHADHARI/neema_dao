import express from "express"
import {
  getWasteLogs,
  getWasteLogById,
  createWasteLog,
  updateWasteLog,
  deleteWasteLog,
  getWasteLogsByUser,
  getWasteAnalytics,
} from "../controllers/wasteLogController.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// All waste log routes are protected
router.use(authenticate)

router.get("/", getWasteLogs)
router.get("/:id", getWasteLogById)
router.post("/", createWasteLog)
router.put("/:id", updateWasteLog)
router.delete("/:id", deleteWasteLog)
router.get("/user/:userId", getWasteLogsByUser)
router.get("/analytics/:userId", getWasteAnalytics)

export default router
