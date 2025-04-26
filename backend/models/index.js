import { sequelize } from "../server.js"
import User from "./user.js"
import Project from "./project.js"
import Inventory from "./inventory.js"
import WasteLog from "./wasteLog.js"
import Badge from "./badge.js"
import UserBadge from "./userBadge.js"

// Define associations
User.hasMany(Project, { foreignKey: "inventorId" })
Project.belongsTo(User, { foreignKey: "inventorId", as: "inventor" })

User.hasMany(Inventory, { foreignKey: "userId" })
Inventory.belongsTo(User, { foreignKey: "userId" })

User.hasMany(WasteLog, { foreignKey: "reportedById" })
WasteLog.belongsTo(User, { foreignKey: "reportedById", as: "reportedBy" })

User.belongsToMany(Badge, { through: UserBadge })
Badge.belongsToMany(User, { through: UserBadge })

// Sync all models with database
const syncModels = async () => {
  try {
    await sequelize.sync()
    console.log("All models were synchronized successfully.")
  } catch (error) {
    console.error("Failed to synchronize models:", error)
  }
}

export { sequelize, User, Project, Inventory, WasteLog, Badge, UserBadge, syncModels }
