import express from 'express';
import { Pool, PoolConnection } from "mysql2/promise"; 
import testRoutes from './routes/test'; // Import the test route
import dotenv from 'dotenv';
import cors from "cors"
import authRoutes from "./routes/authRoutes/authRoutes";
import transactionsRoutes from "./routes/transactions/transactionsRoute";


dotenv.config()

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

//  Routes
app.use("/api/auth" , authRoutes)
app.use("/api/transactions" , transactionsRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
