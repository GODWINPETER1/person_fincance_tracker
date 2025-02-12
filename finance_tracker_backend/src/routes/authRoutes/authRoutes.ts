import express from "express";
import { body } from "express-validator";
import {register , login , getUser} from "../../controllers/authController/authController";
import {authMiddleware} from "../../middleware/authMiddleware/authMiddleware";

const router = express.Router()
// register route
// Register Route
router.post(
    "/register",
    [
        body("name", "Name is required").not().isEmpty(),
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    ],
    register
);

// Login Route
router.post("/login", login);

// Get Authenticated User Route
router.get("/user", authMiddleware, getUser);

export default router;
