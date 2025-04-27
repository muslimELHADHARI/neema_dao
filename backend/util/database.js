import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize('neema', 'root', '123456789/*-', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    // logging: false,  // optional: disable SQL logging
});

export default sequelize;
