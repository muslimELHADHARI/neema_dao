import { User, Project, Inventory, WasteLog, Badge, UserBadge } from "../models/index.js"

// Get all users (with pagination)
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, userType } = req.query
    const offset = (page - 1) * limit

    // Build query options
    const queryOptions = {
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
    }

    // Add filter by userType if provided
    if (userType) {
      queryOptions.where = { userType }
    }

    // Get users with pagination
    const users = await User.findAndCountAll(queryOptions)

    res.json({
      users: users.rows,
      totalUsers: users.count,
      totalPages: Math.ceil(users.count / limit),
      currentPage: Number.parseInt(page),
    })
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Get user by ID error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update user (admin only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, email, userType, isVerified, points } = req.body

    // Find user
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update user
    await user.update({
      firstName,
      lastName,
      email,
      userType,
      isVerified,
      points,
    })

    // Return updated user (excluding password)
    const userData = user.toJSON()
    delete userData.password

    res.json({
      message: "User updated successfully",
      user: userData,
    })
  } catch (error) {
    console.error("Update user error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    // Find user
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Delete user
    await user.destroy()

    res.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get current user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Get user profile error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update current user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const {
      firstName,
      lastName,
      organization,
      location,
      bio,
      phoneNumber,
      website,
      emailNotifications,
      inAppNotifications,
    } = req.body

    // Find user
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update user
    await user.update({
      firstName,
      lastName,
      organization,
      location,
      bio,
      phoneNumber,
      website,
      emailNotifications,
      inAppNotifications,
    })

    // Return updated user (excluding password)
    const userData = user.toJSON()
    delete userData.password

    res.json({
      message: "Profile updated successfully",
      user: userData,
    })
  } catch (error) {
    console.error("Update user profile error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get user badges
export const getUserBadges = async (req, res) => {
  try {
    const userId = req.user.id

    const userBadges = await UserBadge.findAll({
      where: { userId },
      include: [
        {
          model: Badge,
          attributes: ["id", "name", "description", "icon", "category"],
        },
      ],
    })

    res.json(userBadges)
  } catch (error) {
    console.error("Get user badges error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get user projects
export const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { inventorId: req.params.id },
    })

    res.json(projects)
  } catch (error) {
    console.error("Error fetching user projects:", error)
    res.status(500).json({ message: "Server error while fetching user projects" })
  }
}

// Get user inventory
export const getUserInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({
      where: { userId: req.params.id },
    })

    res.json(inventory)
  } catch (error) {
    console.error("Error fetching user inventory:", error)
    res.status(500).json({ message: "Server error while fetching user inventory" })
  }
}

// Get user waste logs
export const getUserWasteLogs = async (req, res) => {
  try {
    const wasteLogs = await WasteLog.findAll({
      where: { reportedById: req.params.id },
    })

    res.json(wasteLogs)
  } catch (error) {
    console.error("Error fetching user waste logs:", error)
    res.status(500).json({ message: "Server error while fetching user waste logs" })
  }
}
