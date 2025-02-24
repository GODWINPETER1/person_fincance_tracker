// Define routes for budgets

import express from "express";
import { createBudgetHandler , getUserBudget , updateBudgetHandler , deleteBudgetHandler} from "../../controllers//budgets/budgets";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware";


const router = express.Router();

// Transaction route protected
router.post("/" , authMiddleware , createBudgetHandler);
router.get("/" , authMiddleware , getUserBudget);
router.put("/:id" , authMiddleware , updateBudgetHandler)
router.delete("/:id" , authMiddleware , deleteBudgetHandler)

export default router;