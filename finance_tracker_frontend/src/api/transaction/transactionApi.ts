import axios from "axios";

const TRANSACTION_API_BASE_URL = "http://localhost:5000/api";

export interface Transaction {
    id?: number;
    userId: number;
    type: "income" | "expense";
    amount: number;
    category: string;
    description: string;
    date? : string
}

// Get all transactions for the logged-in user
export const getTransactions = async () => {

    const response = await axios.get(`${TRANSACTION_API_BASE_URL}/transactions` , {

        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data;
}

// Add a new transaction
export const addTransaction = async (transaction: Transaction) => {

    const token = localStorage.getItem("token")
    const response = await axios.post(`${TRANSACTION_API_BASE_URL}/transactions` , transaction , {
        
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

// update transaction
export const updateTransaction = async (id: number , transaction: Partial<Transaction>) => {

    const response = await axios.put(`${TRANSACTION_API_BASE_URL}/transactions/${id}` , transaction, {

        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data
}

// delete a transaction;
export const deleteTransaction = async (id: number) => {

    const response = await axios.delete(`${TRANSACTION_API_BASE_URL}/transactions/${id}` ,{

        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data
}
