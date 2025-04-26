import { sequelize, User, Badge, Project } from "../models/index.js"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Seed data
const seedData = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connection has been established successfully.")

    // Create admin user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash("admin123", salt)

    const adminUser = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@neemadao.org",
      password: hashedPassword,
      userType: "admin",
      location: "Tunis",
      points: 1000,
      isVerified: true,
    })

    console.log("Admin user created successfully.")

    // Create badges
    const badges = await Badge.bulkCreate([
      {
        name: "Eco Warrior",
        description: "Earn 100 points through platform activities",
        icon: "award",
        pointsRequired: 100,
      },
      {
        name: "Super Voter",
        description: "Vote on 50 different projects",
        icon: "thumbs-up",
        pointsRequired: 250,
      },
      {
        name: "Food Rescuer",
        description: "Save 100kg of food from being wasted",
        icon: "leaf",
        pointsRequired: 300,
      },
      {
        name: "Project Starter",
        description: "Launch a funded project on the platform",
        icon: "rocket",
        pointsRequired: 500,
      },
      {
        name: "Green Leader",
        description: "Earn 1000 points and complete 5 projects",
        icon: "users",
        pointsRequired: 1000,
      },
    ])

    console.log("Badges created successfully.")

    // Create sample projects
    const projects = await Project.bulkCreate([
      {
        title: "Bread to Croutons Initiative",
        description: "Converting day-old bread from bakeries into packaged croutons for restaurants and retail.",
        longDescription:
          "In Tunisia, approximately 900,000 tons of bread are wasted annually. Our initiative collects day-old bread from local bakeries that would otherwise be thrown away and transforms it into seasoned croutons that can be sold to restaurants, hotels, and retail stores.",
        category: "Food Processing",
        fundingGoal: 2500,
        fundingRaised: 1800,
        votes: 78,
        status: "active",
        wasteReduction: "500kg monthly",
        location: "Tunis",
        image: "/placeholder.svg?height=400&width=800",
        tags: ["Bread", "Bakery", "Retail"],
        inventorId: adminUser.id,
      },
      {
        title: "Restaurant Food Donation App",
        description:
          "Mobile application connecting restaurants with excess food to local charities for same-day pickup.",
        longDescription:
          "Our app creates a seamless connection between restaurants with surplus food and local charities that can distribute it to those in need, all within the same day to ensure food safety and quality.",
        category: "Technology",
        fundingGoal: 5000,
        fundingRaised: 5000,
        votes: 124,
        status: "funded",
        wasteReduction: "1200kg monthly",
        location: "Multiple Cities",
        image: "/placeholder.svg?height=400&width=800",
        tags: ["App", "Restaurants", "Charity"],
        inventorId: adminUser.id,
      },
      {
        title: "Compost System for Hotels",
        description: "Implementing efficient composting systems for large hotels to process food waste on-site.",
        longDescription:
          "This project helps hotels reduce their environmental footprint by installing on-site composting systems that turn food waste into valuable compost for gardens and landscaping.",
        category: "Infrastructure",
        fundingGoal: 7500,
        fundingRaised: 2200,
        votes: 67,
        status: "active",
        wasteReduction: "2000kg monthly",
        location: "Hammamet",
        image: "/placeholder.svg?height=400&width=800",
        tags: ["Compost", "Hotels", "Waste Management"],
        inventorId: adminUser.id,
      },
    ])

    console.log("Sample projects created successfully.")

    console.log("All seed data created successfully.")
    process.exit(0)
  } catch (error) {
    console.error("Unable to seed data:", error)
    process.exit(1)
  }
}

seedData()
