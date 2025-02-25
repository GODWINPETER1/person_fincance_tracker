import pool from "../../config/db";
import { ResultSetHeader , RowDataPacket } from 'mysql2'; // Import the correct type


export interface Budget {
    id?: number;
    userId: number;
    category: string;
    amount: number;
    spent?: number;
    month: number
    year: number
}

// // a function to extract month and year from "YYY-MM-DD";
// const extractMonthYear = (dateString: string) => {
//     const date = new Date(dateString);
//     console.log(date.getFullYear())
//     return {
//         month: date.getMonth() + 1, /* JS months are 0-indexed, so add 1 */
//         year: date.getFullYear()
//     }
// }



// Create a new budget
export const createBudget = async (budget: Budget) => {
    const query = `INSERT INTO budgets (userId , category , amount , spent , month , year) VALUES ( ? , ? , ? , ? , ? , ?)`;

    // Execute the query for inserting the budget
    const [result] = await pool.execute(query, [
        budget.userId,
        budget.category,
        budget.amount,
        budget.spent || 0,
        budget.month,
        budget.year,
    ]);

    return result
};







// Get all budgets for a user
export const getBudgetByUser = async (userId: number) => {

    const query = `SELECT * FROM budgets WHERE userId = ? ORDER BY year DESC, month DESC`;
    const [rows] = await pool.execute(query , [userId]);

    return rows
}

// update a budget
export const updateBudget = async (id: number , userId: number , budget: Partial<Budget>) => {

   

    const query = `UPDATE budgets SET category = ? , amount = ? , spent = ? , month = ? , year = ? WHERE id =? AND userId = ?`;
    const [result] = await pool.execute(query , [
        budget.category,
        budget.amount,
        budget.spent,
        budget.month,
        budget.year,
        id,
        userId
    ])

    return result;
}

// delete a budget
export const deleteBudget = async (id: number , userId: number) => {

    const query = `DELETE FROM budgets WHERE id = ? AND userId = ?`;
    const [result] = await pool.execute(query , [id , userId]);

    return result;
}