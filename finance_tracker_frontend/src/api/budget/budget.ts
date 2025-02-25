import axios from "axios";

const BUDGET_API_BASE_URL = "http://localhost:5000/api";


export interface Budget {
    id: number;
    userId: number;
    category: string;
    amount: number;
    spent: number;
    month: number;
    year: number
}

export const getAllTheBudget = async () => {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${BUDGET_API_BASE_URL}/budgets` , {
        
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(response.data)

    return response.data;
};

export const addBudget = async (budget: Budget) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${BUDGET_API_BASE_URL}/budgets`, budget, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Budget added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding budget:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export const updateBudget = async (id: number , budget: Partial<Budget> ) => {

    const token = localStorage.getItem("token");
    const response = await axios.put(`${BUDGET_API_BASE_URL}/budgets/${id}` , budget , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}

export const deleteBudget = async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BUDGET_API_BASE_URL}/budgets/${id}` , {

        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}