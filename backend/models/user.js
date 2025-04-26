import sequelize from "../util/database.js";
import {Sequelize} from "sequelize";
import bcrypt from "bcryptjs"

const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: Sequelize.DataTypes.ENUM("student", "project-inventor", "restaurant-hotel", "investor"),
      allowNull: false,
    },
    organization: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    },
    profileImage: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    points: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
    isVerified: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneNumber: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    },
    website: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    businessType: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    businessLicense: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    investorType: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    investmentFocus: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    university: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    emailNotifications: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    },
    inAppNotifications: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
    },
  },
)

// Instance method to check password
User.prototype.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default User
