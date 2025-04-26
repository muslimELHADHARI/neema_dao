import express from "express"
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  voteProject,
  fundProject,
  getProjectsByUser,
  addProjectUpdate,
  getProjectComments,
  addProjectComment,
} from "../controllers/projectController.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.get("/", getProjects)
router.get("/:id", getProjectById)

// Protected routes
router.use(authenticate)
router.post("/", createProject)
router.put("/:id", updateProject)
router.delete("/:id", deleteProject)
router.post("/:id/vote", voteProject)
router.post("/:id/fund", fundProject)
router.get("/user/:userId", getProjectsByUser)
router.post("/:id/updates", addProjectUpdate)
router.get("/:id/comments", getProjectComments)
router.post("/:id/comments", addProjectComment)

export default router
