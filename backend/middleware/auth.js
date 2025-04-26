import jwt from "jsonwebtoken"
import { User } from "../models/index.js"

export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "No authentication token, access denied" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find user
    const user = await User.findByPk(decoded.id)

    if (!user) {
      return res.status(401).json({ message: "User not found, access denied" })
    }

    // Add user to request
    req.user = {
      id: user.id,
      email: user.email,
      userType: user.userType,
    }

    next()
  } catch (error) {
    console.error("Authentication error:", error)
    res.status(401).json({ message: "Invalid token, access denied" })
  }
}
