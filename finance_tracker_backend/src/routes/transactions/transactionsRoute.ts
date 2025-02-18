// Define the routes for transactions

import express from "express";
import { addTransaction , getUserTransaction , editTransaction , removeTransaction} from "../../controllers/transactions/transactionController";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware";


const router = express.Router();

// Transaction route protected
router.post("/" , authMiddleware , addTransaction);
router.get("/" , authMiddleware , getUserTransaction);
router.put("/:id" , authMiddleware , editTransaction);
router.delete("/:id" , authMiddleware , removeTransaction)

export default router;