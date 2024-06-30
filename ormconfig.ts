import { DataSource } from "typeorm"; 
import * as dotenv from 'dotenv';

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
    entities: ["src/models/*.ts"],
    migrations: ["src/migration/*.ts"],
    synchronize: false
})