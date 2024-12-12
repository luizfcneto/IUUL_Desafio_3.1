import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_HOST = process.env.POSTGRES_HOST;

const sequelize = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    logging: (...msg) => console.log(msg),
    dialect: "postgres",
    timezone: '-03:00'
});

export default sequelize;