import { Inventory } from "../models/index.js"
import { Op } from "sequelize"

// Get all inventory items
export const getAllInventory = async (req, res) => {
  try {
    const { category, status, location } = req.query

    // Build query conditions
    const whereConditions = { userId: req.user.id }
    if (category) whereConditions.category = category
    if (status) whereConditions.status = status
    if (location) whereConditions.location = location

    const inventory = await Inventory.findAll({
      where: whereConditions,
      order: [["expiryDate", "ASC"]],
    })

    res.json(inventory)
  } catch (error) {
    console.error("Error fetching inventory:", error)
    res.status(500).json({ message: "Server error while fetching inventory" })
  }
}

// Get inventory item by ID
export const getInventoryById = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    })

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" })
    }

    res.json(inventoryItem)
  } catch (error) {
    console.error("Error fetching inventory item:", error)
    res.status(500).json({ message: "Server error while fetching inventory item" })
  }
}

// Create inventory item
export const createInventoryItem = async (req, res) => {
  try {
    const { name, category, quantity, unit, expiryDate, location } = req.body

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
      status,
      wastePotential,
      location,
      userId: req.user.id,
    })

    res.status(201).json({
      message: "Inventory item created successfully",
      inventoryItem,
    })
  } catch (error) {
    console.error("Error creating inventory item:", error)
    res.status(500).json({ message: "Server error while creating inventory item" })
  }
}

// Update inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    // Check if inventory item exists
    const inventoryItem = await Inventory.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    })

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" })
    }

    // Update inventory item
    const updatedItem = await inventoryItem.update(req.body)

    // Recalculate status if expiry date was updated
    if (req.body.expiryDate) {
      const today = new Date()
      const expiry = new Date(req.body.expiryDate)
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

      await updatedItem.update({ status, wastePotential })
    }

    res.json({
      message: "Inventory item updated successfully",
      inventoryItem: updatedItem,
    })
  } catch (error) {
    console.error("Error updating inventory item:", error)
    res.status(500).json({ message: "Server error while updating inventory item" })
  }
}

// Delete inventory item
export const deleteInventoryItem = async (req, res) => {
  try {
    // Check if inventory item exists
    const inventoryItem = await Inventory.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    })

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" })
    }

    // Delete inventory item
    await inventoryItem.destroy()

    res.json({ message: "Inventory item deleted successfully" })
  } catch (error) {
    console.error("Error deleting inventory item:", error)
    res.status(500).json({ message: "Server error while deleting inventory item" })
  }
}

// Get inventory suggestions
export const getInventorySuggestions = async (req, res) => {
  try {
    // Find items that are expiring soon
    const expiringItems = await Inventory.findAll({
      where: {
        userId: req.user.id,
        status: {
          [Op.in]: ["warning", "critical"],
        },
      },
      order: [["expiryDate", "ASC"]],
    })

    // Generate suggestions based on expiring items
    const suggestions = expiringItems.map((item) => {
      let suggestion = {}

      if (item.category === "Bakery") {
        suggestion = {
          id: `suggestion-${item.id}`,
          title: `Use expiring ${item.name.toLowerCase()} for alternative recipes`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days. Consider making croutons, bread pudding, or breadcrumbs.`,
          impact: `Potential savings: ${(item.quantity * 1.5).toFixed(1)} TND`,
          type: "recipe",
        }
      } else if (item.category === "Dairy") {
        suggestion = {
          id: `suggestion-${item.id}`,
          title: `Use expiring ${item.name.toLowerCase()} in cooking`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days. Consider using it in sauces, soups, or baked goods.`,
          impact: `Potential savings: ${(item.quantity * 1.8).toFixed(1)} TND`,
          type: "recipe",
        }
      } else if (item.category === "Vegetables") {
        suggestion = {
          id: `suggestion-${item.id}`,
          title: `Process ${item.name.toLowerCase()} for longer storage`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days. Consider freezing, pickling, or making soup.`,
          impact: `Potential savings: ${(item.quantity * 3).toFixed(1)} TND`,
          type: "recipe",
        }
      } else if (item.category === "Meat") {
        suggestion = {
          id: `suggestion-${item.id}`,
          title: `Cook and freeze ${item.name.toLowerCase()}`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days. Consider cooking and freezing portions.`,
          impact: `Potential savings: ${(item.quantity * 12).toFixed(1)} TND`,
          type: "recipe",
        }
      } else {
        suggestion = {
          id: `suggestion-${item.id}`,
          title: `Use ${item.name.toLowerCase()} soon`,
          description: `${item.quantity} ${item.unit} of ${item.name.toLowerCase()} will expire in ${Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days.`,
          impact: `Potential savings: ${(item.quantity * 2).toFixed(1)} TND`,
          type: "recipe",
        }
      }

      return suggestion
    })

    res.json(suggestions)
  } catch (error) {
    console.error("Error generating inventory suggestions:", error)
    res.status(500).json({ message: "Server error while generating inventory suggestions" })
  }
}
