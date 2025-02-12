import express from 'express';
import { Pool, PoolConnection } from "mysql2/promise"; 
import testRoutes from './routes/test'; // Import the test route
import dotenv from 'dotenv';
import cors from "cors"
import authRoutes from "./routes/authRoutes/authRoutes";
import pool from "./config/db";
import { error } from 'console';

dotenv.config()

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

//  Routes
app.use("/api/auth" , authRoutes)

// Test database connection



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
