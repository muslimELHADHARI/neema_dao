import { DataTypes } from "sequelize"
import { sequelize } from "../server.js"

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  longDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.ENUM("Food Processing", "Technology", "Education", "Infrastructure"),
    allowNull: false,
  },
  inventorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  fundingGoal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fundingRaised: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  backers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("draft", "active", "funded", "completed", "cancelled"),
    defaultValue: "draft",
  },
  wasteReduction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gallery: {
    type: DataTypes.JSON, // Array of image URLs
    defaultValue: [],
  },
  tags: {
    type: DataTypes.JSON, // Array of tags
    defaultValue: [],
  },
  timeline: {
    type: DataTypes.JSON, // Array of timeline events
    defaultValue: [],
  },
  team: {
    type: DataTypes.JSON, // Array of team members
    defaultValue: [],
  },
  updates: {
    type: DataTypes.JSON, // Array of project updates
    defaultValue: [],
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

export default Project
