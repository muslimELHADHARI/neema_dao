import { sequelize } from "../models/index.js"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Run migrations
const runMigrations = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connection has been established successfully.")

    // Sync all models with database
    await sequelize.sync({ alter: true })
    console.log("All models were synchronized successfully.")

    process.exit(0)
  } catch (error) {
    console.error("Unable to run migrations:", error)
    process.exit(1)
  }
}

runMigrations()
