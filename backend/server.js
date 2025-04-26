import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Sequelize } from "sequelize"
import routes from "./routes/index.js"
import { syncModels } from "./models/index.js"

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
})

// Test database connection
const testDbConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connection has been established successfully.")

    // Sync models with database
    await syncModels()
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

testDbConnection()

// Routes
app.use("/api", routes)

// Root route
app.get("/", (req, res) => {
  res.send("Neema DAO API is running")
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "An unexpected error occurred",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export { sequelize }
