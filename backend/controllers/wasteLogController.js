import { WasteLog, User, Inventory } from "../models/index.js"
import { Op, Sequelize } from "sequelize"

// Get all waste logs (with pagination and filters)
export const getWasteLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate, reason } = req.query
    const offset = (page - 1) * limit
    const userId = req.user.id

    // Build where clause for filtering
    const whereClause = { reportedById: userId }

    // Add date range filter if provided
    if (startDate || endDate) {
      whereClause.date = {}
      if (startDate) whereClause.date[Op.gte] = new Date(startDate)
      if (endDate) whereClause.date[Op.lte] = new Date(endDate)
    }

    // Add reason filter if provided
    if (reason) whereClause.reason = reason

    // Get waste logs with pagination and filters
    const wasteLogs = await WasteLog.findAndCountAll({
      where: whereClause,
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [["date", "DESC"]],
    })

    res.json({
      wasteLogs: wasteLogs.rows,
      totalLogs: wasteLogs.count,
      totalPages: Math.ceil(wasteLogs.count / limit),
      currentPage: Number.parseInt(page),
    })
  } catch (error) {
    console.error("Get waste logs error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get waste log by ID
export const getWasteLogById = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const wasteLog = await WasteLog.findOne({
      where: {
        id,
        reportedById: userId,
      },
    })

    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" })
    }

    res.json(wasteLog)
  } catch (error) {
    console.error("Get waste log by ID error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create waste log
export const createWasteLog = async (req, res) => {
  try {
    const { item, quantity, unit, reason, date, cost, notes, inventoryId } = req.body
    const userId = req.user.id

    // Create waste log
    const wasteLog = await WasteLog.create({
      item,
      quantity,
      unit,
      reason,
      date: date || new Date(),
      cost,
      notes,
      inventoryId,
      reportedById: userId,
      userId,
    })

    // If inventoryId is provided, update or remove the inventory item
    if (inventoryId) {
      const inventoryItem = await Inventory.findByPk(inventoryId)

      if (inventoryItem && inventoryItem.userId === userId) {
        if (inventoryItem.quantity > quantity) {
          await inventoryItem.update({
            quantity: inventoryItem.quantity - quantity,
            lastUpdated: new Date(),
          })
        } else {
          await inventoryItem.destroy()
        }
      }
    }

    // Add points to user for logging waste (2 points)
    const user = await User.findByPk(userId)
    if (user) {
      await user.update({ points: user.points + 2 })
    }

    res.status(201).json({
      message: "Waste log created successfully",
      wasteLog,
    })
  } catch (error) {
    console.error("Create waste log error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update waste log
export const updateWasteLog = async (req, res) => {
  try {
    const { id } = req.params
    const { item, quantity, unit, reason, date, cost, notes } = req.body
    const userId = req.user.id

    // Find waste log
    const wasteLog = await WasteLog.findOne({
      where: {
        id,
        reportedById: userId,
      },
    })

    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" })
    }

    // Update waste log
    await wasteLog.update({
      item,
      quantity,
      unit,
      reason,
      date,
      cost,
      notes,
    })

    res.json({
      message: "Waste log updated successfully",
      wasteLog,
    })
  } catch (error) {
    console.error("Update waste log error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete waste log
export const deleteWasteLog = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    // Find waste log
    const wasteLog = await WasteLog.findOne({
      where: {
        id,
        reportedById: userId,
      },
    })

    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" })
    }

    // Delete waste log
    await wasteLog.destroy()

    res.json({ message: "Waste log deleted successfully" })
  } catch (error) {
    console.error("Delete waste log error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get waste logs by user
export const getWasteLogsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { page = 1, limit = 10, startDate, endDate } = req.query
    const offset = (page - 1) * limit

    // Check if requesting user is the same as the target user or is an admin
    if (req.user.id !== userId && req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to view these waste logs" })
    }

    // Build where clause for filtering
    const whereClause = { reportedById: userId }

    // Add date range filter if provided
    if (startDate || endDate) {
      whereClause.date = {}
      if (startDate) whereClause.date[Op.gte] = new Date(startDate)
      if (endDate) whereClause.date[Op.lte] = new Date(endDate)
    }

    // Get waste logs with pagination and filters
    const wasteLogs = await WasteLog.findAndCountAll({
      where: whereClause,
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [["date", "DESC"]],
    })

    res.json({
      wasteLogs: wasteLogs.rows,
      totalLogs: wasteLogs.count,
      totalPages: Math.ceil(wasteLogs.count / limit),
      currentPage: Number.parseInt(page),
    })
  } catch (error) {
    console.error("Get waste logs by user error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get waste analytics
export const getWasteAnalytics = async (req, res) => {
  try {
    const { userId } = req.params
    const { startDate, endDate } = req.query

    // Check if requesting user is the same as the target user or is an admin
    if (req.user.id !== userId && req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to view these analytics" })
    }

    // Build where clause for filtering
    const whereClause = { reportedById: userId }

    // Add date range filter if provided
    if (startDate || endDate) {
      whereClause.date = {}
      if (startDate) whereClause.date[Op.gte] = new Date(startDate)
      if (endDate) whereClause.date[Op.lte] = new Date(endDate)
    }

    // Get total waste cost
    const totalWasteCost = await WasteLog.sum("cost", {
      where: whereClause,
    })

    // Get waste by item
    const wasteByItem = await WasteLog.findAll({
      attributes: [
        "item",
        [Sequelize.fn("SUM", Sequelize.col("cost")), "totalCost"],
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalQuantity"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      where: whereClause,
      group: ["item"],
      order: [[Sequelize.fn("SUM", Sequelize.col("cost")), "DESC"]],
    })

    // Get waste by reason
    const wasteByReason = await WasteLog.findAll({
      attributes: [
        "reason",
        [Sequelize.fn("SUM", Sequelize.col("cost")), "totalCost"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      where: whereClause,
      group: ["reason"],
      order: [[Sequelize.fn("SUM", Sequelize.col("cost")), "DESC"]],
    })

    // Get waste trend (monthly)
    const wasteTrend = await WasteLog.findAll({
      attributes: [
        [Sequelize.fn("date_trunc", "month", Sequelize.col("date")), "month"],
        [Sequelize.fn("SUM", Sequelize.col("cost")), "totalCost"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      where: {
        reportedById: userId,
        date: {
          [Op.gte]: Sequelize.literal("NOW() - INTERVAL '6 months'"),
        },
      },
      group: [Sequelize.fn("date_trunc", "month", Sequelize.col("date"))],
      order: [[Sequelize.fn("date_trunc", "month", Sequelize.col("date")), "ASC"]],
    })

    res.json({
      totalWasteCost: totalWasteCost || 0,
      wasteByItem,
      wasteByReason,
      wasteTrend,
    })
  } catch (error) {
    console.error("Get waste analytics error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
