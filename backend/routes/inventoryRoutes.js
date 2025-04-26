import express from "express"
import {
  getInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryByUser,
  getInventorySuggestions,
} from "../controllers/inventoryController.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// All inventory routes are protected
router.use(authenticate)

router.get("/", getInventoryItems)
router.get("/:id", getInventoryItemById)
router.post("/", createInventoryItem)
router.put("/:id", updateInventoryItem)
router.delete("/:id", deleteInventoryItem)
router.get("/user/:userId", getInventoryByUser)
router.get("/suggestions/:userId", getInventorySuggestions)

export default router
