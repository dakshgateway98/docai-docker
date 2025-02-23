import { DataSource } from "typeorm"; 
import * as dotenv from 'dotenv';

dotenv.config();

const dbPassword = String(process.env.DB_PASSWORD || "").trim();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: dbPassword,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    entities: ["dist/src/models/*.js"],
    migrations: ["dist/src/migration/*.js"],
    synchronize: false
})