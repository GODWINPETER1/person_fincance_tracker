import { useState } from "react";
import TransactionForm from "@/features/transactions/AddTransaction";
import { Button } from "@/components/button/button";
import TransactionList from "@/features/transactions/TransactionList";

const TransactionPage = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="p-4 relative h-100vh">
            {/* Button at Top-Left */}
            <div className="absolute top-4 left-4">
                <Button
                    className="bg-blue-500 text-white p-2 rounded-md shadow-md"
                    onClick={() => setShowForm(true)}
                >
                    Add Transaction
                </Button>
            </div>

            {/* Centered Transaction List */}
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-4xl">
                    <TransactionList />
                </div>
            </div>

            {/* Transaction Form as a Dialog/Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <TransactionForm />
                        <Button
                            className="mt-4 w-full bg-gray-500 text-white p-2 rounded-md shadow-md"
                            onClick={() => setShowForm(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionPage;