import { WasteLog, User, Inventory } from "../models/index.js"
import { Op, Sequelize } from "sequelize"

// Get all waste logs
export const getAllWasteLogs = async (req, res) => {
  try {
    const wasteLogs = await WasteLog.findAll({
      where: { reportedById: req.user.id },
      order: [["date", "DESC"]],
      include: [
        {
          model: User,
          as: "reportedBy",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    })

    res.json(wasteLogs)
  } catch (error) {
    console.error("Error fetching waste logs:", error)
    res.status(500).json({ message: "Server error while fetching waste logs" })
  }
}

// Get waste log by ID
export const getWasteLogById = async (req, res) => {
  try {
    const wasteLog = await WasteLog.findOne({
      where: {
        id: req.params.id,
        reportedById: req.user.id,
      },
      include: [
        {
          model: User,
          as: "reportedBy",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    })

    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" })
    }

    res.json(wasteLog)
  } catch (error) {
    console.error("Error fetching waste log:", error)
    res.status(500).json({ message: "Server error while fetching waste log" })
  }
}

// Create waste log
export const createWasteLog = async (req, res) => {
  try {
    const { item, quantity, unit, reason, date, cost } = req.body

    // Create waste log
    const wasteLog = await WasteLog.create({
      item,
      quantity,
      unit,
      reason,
      date: date || new Date(),
      cost,
      reportedById: req.user.id,
    })

    // If the item is in inventory, update or remove it
    const inventoryItem = await Inventory.findOne({
      where: {
        userId: req.user.id,
        name: item,
      },
    })

    if (inventoryItem) {
      if (inventoryItem.quantity > quantity) {
        await inventoryItem.update({
          quantity: inventoryItem.quantity - quantity,
        })
      } else {
        await inventoryItem.destroy()
      }
    }

    // Award points for logging waste (encouraging transparency)
    await User.increment("points", {
      by: 2,
      where: { id: req.user.id },
    })

    res.status(201).json({
      message: "Waste log created successfully",
      wasteLog,
    })
  } catch (error) {
    console.error("Error creating waste log:", error)
    res.status(500).json({ message: "Server error while creating waste log" })
  }
}

// Update waste log
export const updateWasteLog = async (req, res) => {
  try {
    // Check if waste log exists
    const wasteLog = await WasteLog.findOne({
      where: {
        id: req.params.id,
        reportedById: req.user.id,
      },
    })

    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" })
    }

    // Update waste log
    const updatedWasteLog = await wasteLog.update(req.body)

    res.json({
      message: "Waste log updated successfully",
      wasteLog: updatedWasteLog,
    })
  } catch (error) {
    console.error("Error updating waste log:", error)
    res.status(500).json({ message: "Server error while updating waste log" })
  }
}

// Delete waste log
export const deleteWasteLog = async (req, res) => {
  try {
    // Check if waste log exists
    const wasteLog = await WasteLog.findOne({
      where: {
        id: req.params.id,
        reportedById: req.user.id,
      },
    })

    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" })
    }

    // Delete waste log
    await wasteLog.destroy()

    res.json({ message: "Waste log deleted successfully" })
  } catch (error) {
    console.error("Error deleting waste log:", error)
    res.status(500).json({ message: "Server error while deleting waste log" })
  }
}

// Get waste analytics
export const getWasteAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query

    // Build date range condition
    const dateCondition = {}
    if (startDate && endDate) {
      dateCondition.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      }
    } else if (startDate) {
      dateCondition.date = {
        [Op.gte]: new Date(startDate),
      }
    } else if (endDate) {
      dateCondition.date = {
        [Op.lte]: new Date(endDate),
      }
    }

    // Get total waste cost
    const totalWasteCost = await WasteLog.sum("cost", {
      where: {
        reportedById: req.user.id,
        ...dateCondition,
      },
    })

    // Get waste by category (using item name to infer category)
    const wasteByCategory = await WasteLog.findAll({
      attributes: [
        "item",
        [Sequelize.fn("SUM", Sequelize.col("cost")), "totalCost"],
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalQuantity"],
      ],
      where: {
        reportedById: req.user.id,
        ...dateCondition,
      },
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
      where: {
        reportedById: req.user.id,
        ...dateCondition,
      },
      group: ["reason"],
      order: [[Sequelize.fn("SUM", Sequelize.col("cost")), "DESC"]],
    })

    // Get waste trend (monthly)
    const wasteTrend = await WasteLog.findAll({
      attributes: [
        [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("date")), "month"],
        [Sequelize.fn("SUM", Sequelize.col("cost")), "totalCost"],
      ],
      where: {
        reportedById: req.user.id,
        date: {
          [Op.gte]: Sequelize.literal("NOW() - INTERVAL '6 months'"),
        },
      },
      group: [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("date"))],
      order: [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("date"))],
    })

    res.json({
      totalWasteCost: totalWasteCost || 0,
      wasteByCategory,
      wasteByReason,
      wasteTrend,
    })
  } catch (error) {
    console.error("Error fetching waste analytics:", error)
    res.status(500).json({ message: "Server error while fetching waste analytics" })
  }
}
