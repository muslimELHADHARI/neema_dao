import { DataTypes } from 'sequelize'; // Fixed import (should be 'sequelize')
import sequelize from '../util/database.js'; // Ensure this points to your actual sequelize instance

const Badge = sequelize.define('Badge', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generates UUIDV4
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures the name is unique
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  criteria: {
    type: DataTypes.TEXT,
    allowNull: true // Ensure this is required
    // You can provide a default value if needed:
    // defaultValue: 'Default criteria description',
  },
  pointsRequired: {
    type: DataTypes.INTEGER,
    allowNull: true, // Points are optional
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: true, // Category is optional
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Badge is active by default
  },
});

export default Badge;
