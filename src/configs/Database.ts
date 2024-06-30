// src/database.ts
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config()

export class Database {
  private static instance: DataSource;

  private constructor() {}

  public static getInstance(): DataSource {
    if (!Database.instance) {
      try {
        Database.instance = new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: 5432,
            entities: ["src/models/*.ts"],
            migrations: ["src/migration/*.ts"],
            
        });
      } catch (error) {
        console.error('Failed to create database instance:', error);
        throw error;
      }
    }
    return Database.instance;
  }
}
