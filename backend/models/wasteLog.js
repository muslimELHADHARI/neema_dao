import { DataTypes } from "sequelize"
import { sequelize } from "../server.js"

const WasteLog = sequelize.define("WasteLog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  reportedById: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  inventoryId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Inventories",
      key: "id",
    },
  },
})

export default WasteLog
