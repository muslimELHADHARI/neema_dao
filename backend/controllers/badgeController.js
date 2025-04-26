import { Badge, User, UserBadge } from "../models/index.js"

// Get all badges
export const getBadges = async (req, res) => {
  try {
    const badges = await Badge.findAll({
      where: { isActive: true },
      order: [["pointsRequired", "ASC"]],
    })

    res.json(badges)
  } catch (error) {
    console.error("Get badges error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get badge by ID
export const getBadgeById = async (req, res) => {
  try {
    const { id } = req.params

    const badge = await Badge.findByPk(id)

    if (!badge) {
      return res.status(404).json({ message: "Badge not found" })
    }

    res.json(badge)
  } catch (error) {
    console.error("Get badge by ID error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create badge (admin only)
export const createBadge = async (req, res) => {
  try {
    const { name, description, icon, criteria, pointsRequired, category } = req.body

    // Check if user is admin
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to create badges" })
    }

    // Create badge
    const badge = await Badge.create({
      name,
      description,
      icon,
      criteria,
      pointsRequired,
      category,
      isActive: true,
    })

    res.status(201).json({
      message: "Badge created successfully",
      badge,
    })
  } catch (error) {
    console.error("Create badge error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update badge (admin only)
export const updateBadge = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, icon, criteria, pointsRequired, category, isActive } = req.body

    // Check if user is admin
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to update badges" })
    }

    // Find badge
    const badge = await Badge.findByPk(id)
    if (!badge) {
      return res.status(404).json({ message: "Badge not found" })
    }

    // Update badge
    await badge.update({
      name,
      description,
      icon,
      criteria,
      pointsRequired,
      category,
      isActive,
    })

    res.json({
      message: "Badge updated successfully",
      badge,
    })
  } catch (error) {
    console.error("Update badge error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete badge (admin only)
export const deleteBadge = async (req, res) => {
  try {
    const { id } = req.params

    // Check if user is admin
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete badges" })
    }

    // Find badge
    const badge = await Badge.findByPk(id)
    if (!badge) {
      return res.status(404).json({ message: "Badge not found" })
    }

    // Delete badge
    await badge.destroy()

    res.json({ message: "Badge deleted successfully" })
  } catch (error) {
    console.error("Delete badge error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Award badge to user (admin only)
export const awardBadgeToUser = async (req, res) => {
  try {
    const { userId, badgeId } = req.params

    // Check if user is admin
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to award badges" })
    }

    // Check if user exists
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if badge exists
    const badge = await Badge.findByPk(badgeId)
    if (!badge) {
      return res.status(404).json({ message: "Badge not found" })
    }

    // Check if user already has this badge
    const existingUserBadge = await UserBadge.findOne({
      where: {
        userId,
        badgeId,
        isCompleted: true,
      },
    })

    if (existingUserBadge) {
      return res.status(400).json({ message: "User already has this badge" })
    }

    // Award badge to user
    const userBadge = await UserBadge.create({
      userId,
      badgeId,
      earnedDate: new Date(),
      progress: 100,
      isCompleted: true,
    })

    res.json({
      message: "Badge awarded to user successfully",
      userBadge,
    })
  } catch (error) {
    console.error("Award badge to user error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get user badge progress
export const getUserBadgeProgress = async (req, res) => {
  try {
    const { userId } = req.params

    // Check if requesting user is the same as the target user or is an admin
    if (req.user.id !== userId && req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this user's badge progress" })
    }

    // Get all badges
    const badges = await Badge.findAll({
      where: { isActive: true },
    })

    // Get user's badges
    const userBadges = await UserBadge.findAll({
      where: { userId },
      include: [Badge],
    })

    // Get user's points
    const user = await User.findByPk(userId, {
      attributes: ["points"],
    })

    // Calculate progress for each badge
    const badgeProgress = badges.map((badge) => {
      const userBadge = userBadges.find((ub) => ub.badgeId === badge.id)

      let progress = 0
      let isCompleted = false

      if (userBadge) {
        progress = userBadge.progress
        isCompleted = userBadge.isCompleted
      } else if (badge.pointsRequired) {
        // Calculate progress based on points if badge requires points
        progress = Math.min(100, (user.points / badge.pointsRequired) * 100)
        isCompleted = user.points >= badge.pointsRequired
      }

      return {
        badge,
        progress,
        isCompleted,
        earnedDate: userBadge ? userBadge.earnedDate : null,
      }
    })

    res.json(badgeProgress)
  } catch (error) {
    console.error("Get user badge progress error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
