import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction, fetchTransactions } from "@/features/transactions/transactionSlice";
import { AppDispatch } from "@/store/store";
import { Transaction } from "@/api/transaction/transactionApi";
import { Button } from "@/components/button/button";

const TransactionForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<Transaction>({
        id: 1,
        userId: 1, // Replace with the logged-in user's ID
        type: "income",
        amount: 0,
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0], // Default to today's date
    });

    console.log(formData)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createTransaction(formData));
        dispatch(fetchTransactions())
        setFormData({
            id: 1,
            userId: 1,
            type: "income",
            amount: 0,
            category: "",
            description: "",
            date: new Date().toISOString().split("T")[0],
        });
    };

    return (
        <div className="max-w-lg w-full mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Add Transaction</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {/* Type Selection */}
                <div>
                    <label className="block text-gray-600 text-sm font-medium">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                {/* Amount Input */}
                <div>
                    <label className="block text-gray-600 text-sm font-medium">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>

                {/* Category Input */}
                <div>
                    <label className="block text-gray-600 text-sm font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        placeholder="e.g., Salary, Grocery, Entertainment"
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-gray-600 text-sm font-medium">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        placeholder="Brief description of the transaction"
                    />
                </div>

                {/* Date Input */}
                <div>
                    <label className="block text-gray-600 text-sm font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full mt-4 py-3 transition duration-200 shadow-md"
                >
                    Add Transaction
                </Button>
            </form>
        </div>
    );
};

export default TransactionForm;
