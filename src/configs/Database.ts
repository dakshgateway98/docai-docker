// src/database.ts
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config()

export class Database {
  private static instance: DataSource;

  private constructor() {}

  public static getInstance(): DataSource {
    console.log("🔍 Initializing Database Connection...");

    const dbPassword = String(process.env.DB_PASSWORD || process.env.DB_PASS || "").trim();


    if (!Database.instance) {
      try {
        Database.instance = new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: dbPassword, // Make sure it's read properly
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            entities: ["dist/src/models/*.js"],
            migrations: ["dist/src/migration/*.js"],  
        });

        console.log("✅ Database instance created successfully!");
      } catch (error) {
        console.error("❌ Failed to create database instance:", error);
        throw error;
      }
    }
    return Database.instance;
}
}
