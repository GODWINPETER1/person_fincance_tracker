import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTransaction } from "@/features/transactions/transactionSlice";
import { AppDispatch } from "@/store/store";
import { Transaction } from "@/api/transaction/transactionApi"; // Import the correct type

const EditTransactionModal = ({ transaction, onClose }: { transaction: Transaction; onClose: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();

    // Define the state with a proper type
    const [formData, setFormData] = useState<Transaction>({ ...transaction });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev: Transaction) => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(editTransaction({ id: formData.id, transaction: formData }));
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Type:</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTransactionModal;
