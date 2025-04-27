import { Sequelize } from "sequelize"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Create Sequelize instance
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
export const testDbConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connection has been established successfully.")
        return true
    } catch (error) {
        console.error("Unable to connect to the database:", error)
        return false
    }
}

export default sequelize
