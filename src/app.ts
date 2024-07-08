import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import  {Database}  from './configs/Database';
import authRoutes from './routes/auth';
import './configs/passport';


dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'myseessiioonn', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
Database.getInstance().initialize().then(() => {console.log("Database initialized!")}).catch((err) => {console.log("Error with database connection::", err)})

app.get('/health', (req, res) => {
  return res.send(`This is DocAI backend working fine!`);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Routes
app.use('/api/auth', authRoutes);

export default app;
