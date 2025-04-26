import { Badge, User, UserBadge } from "../models/index.js"

// Get all badges
export const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.findAll()
    res.json(badges)
  } catch (error) {
    console.error("Error fetching badges:", error)
    res.status(500).json({ message: "Server error while fetching badges" })
  }
}

// Get badge by ID
export const getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findByPk(req.params.id)

    if (!badge) {
      return res.status(404).json({ message: "Badge not found" })
    }

    res.json(badge)
  } catch (error) {
    console.error("Error fetching badge:", error)
    res.status(500).json({ message: "Server error while fetching badge" })
  }
}

// Create badge
export const createBadge = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to create badges" })
    }

    const { name, description, icon, pointsRequired } = req.body

    // Create badge
    const badge = await Badge.create({
      name,
      description,
      icon,
      pointsRequired,
    })

    res.status(201).json({
      message: "Badge created successfully",
      badge,
    })
  } catch (error) {
    console.error("Error creating badge:", error)
    res.status(500).json({ message: "Server error while creating badge" })
  }
}

// Update badge
export const updateBadge = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to update badges" })
    }

    // Check if badge exists
    const badge = await Badge.findByPk(req.params.id)
    if (!badge) {
      return res.status(404).json({ message: "Badge not found" })
    }

    // Update badge
    const updatedBadge = await badge.update(req.body)

    res.json({
      message: "Badge updated successfully",
      badge: updatedBadge,
    })
  } catch (error) {
    console.error("Error updating badge:", error)
    res.status(500).json({ message: "Server error while updating badge" })
  }
}

// Delete badge
export const deleteBadge = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete badges" })
    }

    // Check if badge exists
    const badge = await Badge.findByPk(req.params.id)
    if (!badge) {
      return res.status(404).json({ message: "Badge not found" })
    }

    // Delete badge
    await badge.destroy()

    res.json({ message: "Badge deleted successfully" })
  } catch (error) {
    console.error("Error deleting badge:", error)
    res.status(500).json({ message: "Server error while deleting badge" })
  }
}

// Award badge to user
export const awardBadgeToUser = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to award badges" })
    }

    const badgeId = req.params.id
    const userId = req.params.userId

    // Check if badge exists
    const badge = await Badge.findByPk(badgeId)
    if (!badge) {
      return res.status(404).json({ message: "Badge not found" })
    }

    // Check if user exists
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if user already has this badge
    const existingBadge = await UserBadge.findOne({
      where: {
        userId,
        badgeId,
      },
    })

    if (existingBadge) {
      return res.status(400).json({ message: "User already has this badge" })
    }

    // Award badge to user
    await UserBadge.create({
      userId,
      badgeId,
      earnedDate: new Date(),
    })

    res.json({ message: "Badge awarded to user successfully" })
  } catch (error) {
    console.error("Error awarding badge to user:", error)
    res.status(500).json({ message: "Server error while awarding badge to user" })
  }
}
