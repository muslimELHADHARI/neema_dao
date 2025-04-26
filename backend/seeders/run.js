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
      userType: "Student",
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
        title: "Fruit to Jam Initiative",
        description: "Transforming overripe fruits into delicious artisanal jams for local markets.",
        longDescription:
            "Every year, tons of overripe fruits are discarded due to cosmetic imperfections. This project collects these fruits from local farms and markets, turning them into high-quality, natural jams sold at community events and organic stores.",
        category: "Food Processing",
        fundingGoal: 2800,
        fundingRaised: 1900,
        votes: 82,
        status: "active",
        wasteReduction: "600kg monthly",
        location: "Sousse",
        image: "/placeholder.svg?height=400&width=800",
        tags: ["Fruit", "Jam", "Organic"],
        inventorId: adminUser.id,
      },
      {
        title: "Community Food Fridge Network",
        description:
            "Setting up free-access community fridges stocked with surplus food for anyone in need.",
        longDescription:
            "Our project installs accessible refrigerators around neighborhoods where individuals and businesses can deposit or take surplus food. This helps reduce food waste and supports communities experiencing food insecurity.",
        category: "Technology",
        fundingGoal: 4500,
        fundingRaised: 4500,
        votes: 130,
        status: "funded",
        wasteReduction: "1400kg monthly",
        location: "Tunis",
        image: "/placeholder.svg?height=400&width=800",
        tags: ["Community", "Fridge", "Donation"],
        inventorId: adminUser.id,
      },
      {
        title: "Biogas Systems for Restaurants",
        description: "Installing biogas digesters in restaurants to convert food waste into clean energy.",
        longDescription:
            "Restaurants generate tons of organic waste daily. This project installs small-scale biogas systems that convert kitchen waste into renewable energy for cooking and heating, helping businesses lower their carbon footprint.",
        category: "Infrastructure",
        fundingGoal: 8000,
        fundingRaised: 3500,
        votes: 73,
        status: "active",
        wasteReduction: "2500kg monthly",
        location: "Monastir",
        image: "/placeholder.svg?height=400&width=800",
        tags: ["Biogas", "Restaurants", "Clean Energy"],
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
