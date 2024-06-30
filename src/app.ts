import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import  {Database}  from './configs/Database';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Database connection
Database.getInstance().initialize().then(() => {console.log("Database initialized!")}).catch((err) => {console.log("Error with database connection::", err)})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Routes
export default app;
