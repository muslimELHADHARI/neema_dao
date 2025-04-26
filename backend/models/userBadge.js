import { DataTypes } from "sequelize"
import sequelize from "../util/database.js";


const UserBadge = sequelize.define("UserBadge", {
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
  badgeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Badges",
      key: "id",
    },
  },
  earnedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  progress: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

export default UserBadge
