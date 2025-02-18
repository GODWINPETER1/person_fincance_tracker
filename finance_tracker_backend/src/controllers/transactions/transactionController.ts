// Handle incoming Apis

import {Request , Response} from "express";
import { createTransaction , getTransactionByUser , updateTransaction , deleteTransaction} from "../../models/transaction/transaction";

// Add a transaction (income or expense)
export const addTransaction = async (req: Request , res: Response) => {

    try {

        const {type, amount , category , description  } = req.body;
        const userId = (req as any).user.id // Extract userId from jwt; 

        if(!type || !amount || !category) {

            res.status(400).json({message: "Missing requires fields."})
            return;
        }

        const transaction = {userId , type , amount , category , description};
        createTransaction(transaction);
        res.status(200).json({message: "Transaction added successfully!"}) 
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}

// Get all transaction for a user
export const getUserTransaction = async (req: Request , res: Response) => {

    try {
        const userId = (req as any).user.id;
        const transaction = await getTransactionByUser(userId);
        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}

// update a transaction
export const editTransaction = async (req: Request , res: Response) => {

    try {
        const {id} = req.params;
        const userId = (req as any).user.id;
        const updateData = req.body;


        await updateTransaction(Number(id) , userId , updateData);
        res.json({message: "Transaction updated successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal Server error"})
    }
}

export const removeTransaction = async (req: Request , res: Response) => {

    try {
        const {id} = req.params;
        const userId = (req as any).user.id;

        await deleteTransaction(Number(id) , userId);
        res.json({message: "Transaction Deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}