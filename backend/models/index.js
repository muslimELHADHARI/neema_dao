import { sequelize } from "../server.js"
import User from "./user.js"
import Project from "./project.js"
import Inventory from "./inventory.js"
import WasteLog from "./wasteLog.js"
import Badge from "./badge.js"
import UserBadge from "./userBadge.js"

// Define associations
User.hasMany(Project, { foreignKey: "inventorId", as: "projects" })
Project.belongsTo(User, { foreignKey: "inventorId", as: "inventor" })

User.hasMany(Inventory, { foreignKey: "userId", as: "inventory" })
Inventory.belongsTo(User, { foreignKey: "userId", as: "user" })

User.hasMany(WasteLog, { foreignKey: "reportedById", as: "wasteLogs" })
WasteLog.belongsTo(User, { foreignKey: "reportedById", as: "reportedBy" })

User.belongsToMany(Badge, { through: UserBadge, foreignKey: "userId" })
Badge.belongsToMany(User, { through: UserBadge, foreignKey: "badgeId" })

Inventory.hasMany(WasteLog, { foreignKey: "inventoryId", as: "wasteLogs" })
WasteLog.belongsTo(Inventory, { foreignKey: "inventoryId", as: "inventory" })

// Sync all models with database
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log("All models were synchronized successfully.")
  } catch (error) {
    console.error("Failed to synchronize models:", error)
  }
}

export { sequelize, User, Project, Inventory, WasteLog, Badge, UserBadge, syncModels }
