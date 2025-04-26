import jwt from "jsonwebtoken"
import { User } from "../models/index.js"

// Register a new user
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType, organization, location } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" })
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      userType,
      organization,
      location,
      // Add 50 points for joining the platform
      points: 50,
    })

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    // Return user data and token (excluding password)
    const userData = user.toJSON()
    delete userData.password

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error during registration", error: error.message })
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.checkPassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    // Return user data and token (excluding password)
    const userData = user.toJSON()
    delete userData.password

    res.json({
      message: "Login successful",
      user: userData,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error during login", error: error.message })
  }
}

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Find user by email
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // In a real application, you would:
    // 1. Generate a password reset token
    // 2. Save it to the database with an expiry
    // 3. Send an email with a reset link

    // For this example, we'll just acknowledge the request
    res.json({ message: "Password reset instructions sent to your email" })
  } catch (error) {
    console.error("Forgot password error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body

    // In a real application, you would:
    // 1. Verify the reset token
    // 2. Check if it's expired
    // 3. Update the user's password

    // For this example, we'll just acknowledge the request
    res.json({ message: "Password has been reset successfully" })
  } catch (error) {
    console.error("Reset password error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Verify email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body

    // In a real application, you would:
    // 1. Verify the email verification token
    // 2. Update the user's isVerified status

    // For this example, we'll just acknowledge the request
    res.json({ message: "Email verified successfully" })
  } catch (error) {
    console.error("Email verification error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
