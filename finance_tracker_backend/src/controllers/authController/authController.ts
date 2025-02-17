import {Request , Response} from "express";
import bcrypt from 'bcryptjs';
import  Jwt  from "jsonwebtoken";
import { validationResult } from "express-validator";
import pool from "../../config/db";
import { AuthRequest } from "../../middleware/authMiddleware/authMiddleware";

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register a new user
// Write a asynchronous function , where it can perform operations like database queries or api calls without blocking the main thread
// req: represent the request object which contains data sent by the client
// res: send data back to the client
export const register = async (req: Request , res: Response): Promise<void> => {

    // validationResult(req) - function from express-validator checks if the request data passes validation rules
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    const {name , email , password} = req.body;

    try {

        // check if user already exists
        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?" , [email]);
        if ((existingUser as any).length > 0) {

            res.status(400).json({message: "User already exists"});
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password , salt)

        // Insert new user into database
        await pool.query("INSERT INTO users (name , email , password) VALUES (? , ? , ?)" , [name , email , hashpassword]);
        res.status(200).json({message: "User registerd successfully!"})
    } catch (error) {

        console.error("Registration Error: " , error)
        res.status(500).json({message: "Server error"})
    }
};

//  User Login
export const login = async (req: Request , res: Response): Promise<void> => {

    const {email , password} = req.body;

    try {
        // check if the user exists
        const [user] = await pool.query("SELECT * FROM users WHERE email = ?" , [email]);
        if((user as any).length === 0) {
            res.status(400).json({message: "Invalid credential"})
            return;
        }

        const foundUser = (user as any)[0];

        // validate password
        const isMatch = await bcrypt.compare(password , foundUser.password);
        if (!isMatch) {

            res.status(400).json({message: "Invalid credential"})
            return;
        }

        // Generate JWT TOKEN
        const token = Jwt.sign({id: foundUser.id} , JWT_SECRET , {expiresIn: "1h"})
        res.json({token, message: "User Login Successfully", user: {id: foundUser.id , name: foundUser.name , email: foundUser.email}});

    } catch (error) {

        console.error("Login Error:" , error);
        res.status(500).json({message: "Server error"})
    }
};

// Get Authenticated user
export const getUser = async (req: AuthRequest , res: Response): Promise<void> => {

    try {
        const userId = req.user?.id; 

        if (!userId) {
            res.status(401).json({message: "Unauthorized"})
        }

        const [user]: any = await pool.query("SELECT id , name , email FROM users WHERE id = ?" , [userId]);
        if (user.length === 0) {

            res.status(404).json({message: "User not found"});
            return;
        }

        res.json(user[0]);
    } catch (error) {
        console.error("Get user Error" , error)
        res.status(500).json({message: "Server error"})
    }

}