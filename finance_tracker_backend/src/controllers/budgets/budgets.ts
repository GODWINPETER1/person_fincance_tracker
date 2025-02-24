// handle api request
import { Request , Response } from "express";
import { createBudget , getBudgetByUser , updateBudget , deleteBudget } from "../../models/budget/budget";
import { validationResult } from "express-validator";

// create a budget
export const createBudgetHandler = async (req: Request , res: Response) => {

    try {
        const errors = validationResult(req)
        if(!errors.isEmpty())
        res.status(400).json({errors: errors.array()});


        const {userId , category , amount , spent , month , year} = req.body;

        const result = await createBudget({ userId , category , amount , spent , month , year});
        res.status(201).json({message: "Budget created successfully"})  
         
    } catch (error) {

        console.error("Error creating budget:" , error);
        res.status(500).json({message: "Internal server Error"})
    }
}

// Get all budgets for a user
export const getUserBudget = async (req: Request , res: Response) => {

    try {

        const userId = (req as any).user.id;
        const budgets = await getBudgetByUser(userId);
        res.status(200).json(budgets);

    } catch (error) {
        console.error("Error fetching budgets:" , error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

// update a budget
export const updateBudgetHandler = async (req: Request , res: Response) => {

    try {

        const {id} = req.params;
        const userId = (req as any).user.id;
        const budgetData = req.body;

        const result = await updateBudget(Number(id) , userId , budgetData);
        res.status(200).json({message: "Budget updated successfully" , result})

    } catch (error) {
        console.error("Error updating budget:" , error);
        res.status(500).json({message: "Internal server Error"})
    }
    
}

// Delete a budget
export const deleteBudgetHandler = async (req: Request , res: Response) => {

    try {

        const userId = (req as any).user.id;
        const {id} = req.params;

        const result = await deleteBudget(Number(id) , userId);
        res.status(200).json({message: "Budget Deleted successfully"})
    } catch (error) {
        console.error("Error deleting budget:" , error);
        res.status(500).json({message: "Internal server error"})
    }
}
