// The transaction schema in MySQL 
// model defines CRUD functions for transactions
import pool from "../../config/db";

export interface Transaction {
    id?: number;
    userId: number;
    type: "income" | "expense";
    amount: number;
    category: string;
    description: string;
    date?: Date;
}

// Create a new transaction
export const createTransaction = async (transaction: Transaction) => {

    const query = `INSERT INTO transactions (userId , type , amount , category, description , date) values (? , ? , ?, ?, ? , ? )`;

    const [result] = await pool.execute(query , [
        transaction.userId,
        transaction.type,
        transaction.amount,
        transaction.category,
        transaction.description,
        transaction.date || new Date()
    ])

    return result;
}

// fetching all transaction for a user
export const getTransactionByUser = async (userId: number) => {

    const query = `SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC`;
    const [rows] = await pool.execute(query , [userId]);
    return rows
}

// update a transaction
export const updateTransaction = async (id: number , userId: number ,transaction: Partial<Transaction> ) => {

    const query = `UPDATE transactions SET type = ?, amount = ?, category = ?, description = ? WHERE id = ? AND userId = ?`;

    const [result] = await pool.execute(query , [
        transaction.type,
        transaction.amount,
        transaction.category,
        transaction.description,
        id,
        userId
    ])
    return result;
}

// Delete a transaction
export const deleteTransaction = async ( id: number , userId: number) => {

    const query = `DELETE FROM transactions WHERE id = ? AND userId = ?`;
    const [result] = await pool.execute(query , [id , userId])
    return result;
}
