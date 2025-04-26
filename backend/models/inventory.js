import { DataTypes } from "sequelize"
import sequelize from "../util/database.js";


const Inventory = sequelize.define("Inventory", {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
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
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("good", "warning", "critical"),
    defaultValue: "good",
  },
  wastePotential: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "low",
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  costPerUnit: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
})

export default Inventory
