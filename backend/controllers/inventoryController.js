import { Inventory, User } from "../models/index.js"
import { Op } from "sequelize"

// Get all inventory items (with pagination and filters)
export const getInventoryItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, location } = req.query
    const offset = (page - 1) * limit
    const userId = req.user.id

    // Build where clause for filtering
    const whereClause = { userId }
    if (category) whereClause.category = category
    if (status) whereClause.status = status
    if (location) whereClause.location = location

    // Get inventory items with pagination and filters
    const inventory = await Inventory.findAndCountAll({
      where: whereClause,
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [["expiryDate", "ASC"]],
    })

    res.json({
      inventory: inventory.rows,
      totalItems: inventory.count,
      totalPages: Math.ceil(inventory.count / limit),
      currentPage: Number.parseInt(page),
    })
  } catch (error) {
    console.error("Get inventory items error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get inventory item by ID
export const getInventoryItemById = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const inventoryItem = await Inventory.findOne({
      where: {
        id,
        userId,
      },
    })

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" })
    }

    res.json(inventoryItem)
  } catch (error) {
    console.error("Get inventory item by ID error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create inventory item
export const createInventoryItem = async (req, res) => {
  try {
    const { name, category, quantity, unit, expiryDate, location, notes, costPerUnit } = req.body
    const userId = req.user.id

    // Calculate status based on expiry date
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))

    let status = "good"
    let wastePotential = "low"

    if (daysUntilExpiry <= 2) {
      status = "critical"
      wastePotential = "high"
    } else if (daysUntilExpiry <= 5) {
      status = "warning"
      wastePotential = "medium"
    }

    // Create inventory item
    const inventoryItem = await Inventory.create({
      name,
      category,
      quantity,
      unit,
      expiryDate,
      location,
      notes,
      costPerUnit,
      status,
      wastePotential,
      userId,
    })

    // Add points to user for tracking inventory (5 points)
    const user = await User.findByPk(userId)
    if (user) {
      await user.update({ points: user.points + 5 })
    }

    res.status(201).json({
      message: "Inventory item created successfully",
      inventoryItem,
    })
  } catch (error) {
    console.error("Create inventory item error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params
    const { name, category, quantity, unit, expiryDate, location, notes, costPerUnit } = req.body
    const userId = req.user.id

    // Find inventory item
    const inventoryItem = await Inventory.findOne({
      where: {
        id,
        userId,
      },
    })

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" })
    }

    // Calculate status based on expiry date
    let status = inventoryItem.status
    let wastePotential = inventoryItem.wastePotential

    if (expiryDate) {
      const today = new Date()
      const expiry = new Date(expiryDate)
      const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))

      if (daysUntilExpiry <= 2) {
        status = "critical"
        wastePotential = "high"
      } else if (daysUntilExpiry <= 5) {
        status = "warning"
        wastePotential = "medium"
      } else {
        status = "good"
        wastePotential = "low"
      }
    }

    // Update inventory item
    await inventoryItem.update({
      name,
      category,
      quantity,
      unit,
      expiryDate,
      location,
      notes,
      costPerUnit,
      status,
      wastePotential,
      lastUpdated: new Date(),
    })

    res.json({
      message: "Inventory item updated successfully",
      inventoryItem,
    })
  } catch (error) {
    console.error("Update inventory item error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete inventory item
export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    // Find inventory item
    const inventoryItem = await Inventory.findOne({
      where: {
        id,
        userId,
      },
    })

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" })
    }

    // Delete inventory item
    await inventoryItem.destroy()

    res.json({ message: "Inventory item deleted successfully" })
  } catch (error) {
    console.error("Delete inventory item error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get inventory by user
export const getInventoryByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { page = 1, limit = 10, category, status } = req.query
    const offset = (page - 1) * limit

    // Check if requesting user is the same as the target user or is an admin
    if (req.user.id !== userId && req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this inventory" })
    }

    // Build where clause for filtering
    const whereClause = { userId }
    if (category) whereClause.category = category
    if (status) whereClause.status = status

    // Get inventory items with pagination and filters
    const inventory = await Inventory.findAndCountAll({
      where: whereClause,
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [["expiryDate", "ASC"]],
    })

    res.json({
      inventory: inventory.rows,
      totalItems: inventory.count,
      totalPages: Math.ceil(inventory.count / limit),
      currentPage: Number.parseInt(page),
    })
  } catch (error) {
    console.error("Get inventory by user error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get inventory suggestions
export const getInventorySuggestions = async (req, res) => {
  try {
    const { userId } = req.params

    // Check if requesting user is the same as the target user or is an admin
    if (req.user.id !== userId && req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized to view these suggestions" })
    }

    // Find items that are expiring soon
    const expiringItems = await Inventory.findAll({
      where: {
        userId,
        status: {
          [Op.in]: ["warning", "critical"],
        },
      },
      order: [["expiryDate", "ASC"]],
    })

    // Generate suggestions based on expiring items
    const suggestions = expiringItems.map((item) => {
      const daysUntilExpiry = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))
      const cost = item.costPerUnit ? item.quantity * item.costPerUnit : item.quantity * 2 // Default cost estimate

      let suggestion = {
        id: `suggestion-${item.id}`,
        itemId: item.id,
        itemName: item.name,
        daysUntilExpiry,
        quantity: item.quantity,
        unit: item.unit,
        potentialSavings: cost.toFixed(2),
      }

      if (item.category === "Bakery") {
        suggestion = {
          ...suggestion,
          title: `Use expiring ${item.name.toLowerCase()} for alternative recipes`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${daysUntilExpiry} days. Consider making croutons, bread pudding, or breadcrumbs.`,
          actionType: "recipe",
        }
      } else if (item.category === "Dairy") {
        suggestion = {
          ...suggestion,
          title: `Use expiring ${item.name.toLowerCase()} in cooking`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${daysUntilExpiry} days. Consider using it in sauces, soups, or baked goods.`,
          actionType: "recipe",
        }
      } else if (item.category === "Vegetables") {
        suggestion = {
          ...suggestion,
          title: `Process ${item.name.toLowerCase()} for longer storage`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${daysUntilExpiry} days. Consider freezing, pickling, or making soup.`,
          actionType: "preserve",
        }
      } else if (item.category === "Meat") {
        suggestion = {
          ...suggestion,
          title: `Cook and freeze ${item.name.toLowerCase()}`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${daysUntilExpiry} days. Consider cooking and freezing portions.`,
          actionType: "cook",
        }
      } else {
        suggestion = {
          ...suggestion,
          title: `Use ${item.name.toLowerCase()} soon`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${daysUntilExpiry} days.`,
          actionType: "use",
        }
      }

      return suggestion
    })

    res.json(suggestions)
  } catch (error) {
    console.error("Get inventory suggestions error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
