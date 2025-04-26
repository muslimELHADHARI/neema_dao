import express from "express"
import authRoutes from "./authRoutes.js"
import userRoutes from "./userRoutes.js"
import projectRoutes from "./projectRoutes.js"
import inventoryRoutes from "./inventoryRoutes.js"
import wasteLogRoutes from "./wasteLogRoutes.js"
import badgeRoutes from "./badgeRoutes.js"

const router = express.Router()

// Mount routes
router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/projects", projectRoutes)
router.use("/inventory", inventoryRoutes)
router.use("/waste-logs", wasteLogRoutes)
router.use("/badges", badgeRoutes)

export default router
