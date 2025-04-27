import { Project, User } from "../models/index.js"
import { Op } from "sequelize"

// Get all projects (with pagination and filters)
export const getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, location, search } = req.query
    const offset = (page - 1) * limit

    // Build where clause for filtering
    const whereClause = {}
    if (category) whereClause.category = category
    if (status) whereClause.status = status
    if (location) whereClause.location = location
    if (search) {
      whereClause[Op.or] = [{ title: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }]
    }

    // Get projects with pagination and filters
    const projects = await Project.findAndCountAll({
      where: whereClause,
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "inventor",
          attributes: ["id", "firstName", "lastName", "userType", "organization"],
        },
      ],
    })

    res.json({
      projects: projects.rows,
      totalProjects: projects.count,
      totalPages: Math.ceil(projects.count / limit),
      currentPage: Number.parseInt(page),
    })
  } catch (error) {
    console.error("Get projects error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params

    const project = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: "inventor",
          attributes: ["id", "firstName", "lastName", "userType", "organization", "location", "profileImage"],
        },
      ],
    })

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json(project)
  } catch (error) {
    console.error("Get project by ID error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create a new project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      longDescription,
      category,
      fundingGoal,
      wasteReduction,
      location,
      image,
      gallery,
      tags,
      timeline,
      team,

    } = req.body

    // Set inventor ID from authenticated user


    const inventorId = req.user.id


    // Create project
    const project = await Project.create({
      title,
      description,
      longDescription,
      category,
      inventorId,
      fundingGoal,
      wasteReduction,
      location,
      image,
      gallery,
      tags,
      timeline,
      team,
      status: "active", // Default to draft
    })

    // Add points to user for creating a project (20 points)
    const user = await User.findByPk(inventorId)
    if (user) {
      await user.update({ points: user.points + 20 })
    }

    res.status(201).json({
      message: "Project created successfully",
      project,
    })
  } catch (error) {
    console.error("Create project error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      description,
      longDescription,
      category,
      fundingGoal,
      wasteReduction,
      location,
      image,
      gallery,
      tags,
      timeline,
      team,
      status,
      isPublished,
    } = req.body

    // Find project
    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // Check if user is the project inventor
    if (project.inventorId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this project" })
    }

    // Update project
    await project.update({
      title,
      description,
      longDescription,
      category,
      fundingGoal,
      wasteReduction,
      location,
      image,
      gallery,
      tags,
      timeline,
      team,
      status,
      isPublished,
    })

    res.json({
      message: "Project updated successfully",
      project,
    })
  } catch (error) {
    console.error("Update project error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params

    // Find project
    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // Check if user is the project inventor
    if (project.inventorId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this project" })
    }

    // Delete project
    await project.destroy()

    res.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Delete project error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Vote on a project
export const voteProject = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    // Find project
    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // In a real application, you would:
    // 1. Check if user has already voted
    // 2. Create a vote record in a votes table

    // For this example, we'll just increment the votes count
    await project.update({ votes: project.votes + 1 })

    // Add points to user for voting (5 points)
    const user = await User.findByPk(userId)
    if (user) {
      await user.update({ points: user.points + 5 })
    }

    res.json({
      message: "Vote recorded successfully",
      project,
    })
  } catch (error) {
    console.error("Vote project error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Fund a project
export const fundProject = async (req, res) => {
  try {
    const { id } = req.params
    const { amount } = req.body
    const userId = req.user.id

    // Find project
    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // Update project funding
    const newFundingRaised = project.fundingRaised + Number.parseFloat(amount)
    const newBackers = project.backers + 1

    // Update project status if fully funded
    let newStatus = project.status
    if (newFundingRaised >= project.fundingGoal && project.status === "draft") {
      newStatus = "funded"
    }

    await project.update({
      fundingRaised: newFundingRaised,
      backers: newBackers,
      status: newStatus,
    })

    // In a real application, you would:
    // 1. Process payment
    // 2. Create a funding record in a fundings table

    // Add points to user for funding (10 points per 100 TND)
    const pointsToAdd = Math.floor(amount / 100) * 10
    const user = await User.findByPk(userId)
    if (user) {
      await user.update({ points: user.points + pointsToAdd })
    }

    res.json({
      message: "Funding recorded successfully",
      project,
    })
  } catch (error) {
    console.error("Fund project error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get projects by user
export const getProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit

    // Get projects with pagination
    const projects = await Project.findAndCountAll({
      where: { inventorId: userId },
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [["createdAt", "DESC"]],
    })

    res.json({
      projects: projects.rows,
      totalProjects: projects.count,
      totalPages: Math.ceil(projects.count / limit),
      currentPage: Number.parseInt(page),
    })
  } catch (error) {
    console.error("Get projects by user error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Add project update
export const addProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    // Find project
    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // Check if user is the project inventor
    if (project.inventorId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this project" })
    }

    // Add update to project
    const updates = project.updates || []
    updates.push({
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString(),
    })

    await project.update({ updates })

    res.json({
      message: "Project update added successfully",
      project,
    })
  } catch (error) {
    console.error("Add project update error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get project comments
export const getProjectComments = async (req, res) => {
  try {
    const { id } = req.params

    // In a real application, you would:
    // 1. Get comments from a comments table

    // For this example, we'll just return a mock response
    res.json({
      comments: [
        {
          id: "1",
          userId: "user1",
          userName: "Mohamed Karim",
          content: "This is a great initiative! I've seen how much bread is wasted in my neighborhood bakery.",
          date: "2023-03-20",
        },
        {
          id: "2",
          userId: "user2",
          userName: "Fatima Zouari",
          content:
            "As a restaurant owner, I'm interested in your product. Will you be offering different flavors or just the traditional croutons?",
          date: "2023-03-18",
        },
      ],
    })
  } catch (error) {
    console.error("Get project comments error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Add project comment
export const addProjectComment = async (req, res) => {
  try {
    const { id } = req.params
    const { content } = req.body
    const userId = req.user.id

    // Find project
    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // In a real application, you would:
    // 1. Create a comment in a comments table

    // For this example, we'll just return a mock response
    res.json({
      message: "Comment added successfully",
      comment: {
        id: Date.now().toString(),
        userId,
        content,
        date: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Add project comment error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
