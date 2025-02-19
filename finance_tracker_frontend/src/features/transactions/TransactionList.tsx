import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "@/features/transactions/transactionSlice";
import { AppDispatch, RootState } from "@/store/store";

const TransactionList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { transactions, loading, error } = useSelector((state: RootState) => state.transactions);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    if (loading) return <p className="text-center text-indigo-500 text-lg font-semibold">Loading transactions...</p>;
    if (error) return <p className="text-center text-red-500 text-lg font-semibold">Error: {error}</p>;

    const incomeTransactions = transactions.filter((t) => t.type === "income");
    const expenseTransactions = transactions.filter((t) => t.type === "expense");

    return (
        <div className="max-w-6xl w-full mx-auto p-6">
            {/* Income Transactions Table */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold text-green-600 mb-4">Income Transactions</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-green-500 text-white">
                            <tr>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4">Description</th>
                                <th className="py-3 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeTransactions.length > 0 ? (
                                incomeTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b hover:bg-gray-100">
                                        <td className="py-3 px-4 text-green-600 font-medium">${Number(transaction.amount).toFixed(2)}</td>
                                        <td className="py-3 px-4">{transaction.category}</td>
                                        <td className="py-3 px-4">{transaction.description}</td>
                                        <td className="py-3 px-4">{new Date().toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-gray-500">No income transactions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Expense Transactions Table */}
            <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">Expense Transactions</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-red-500 text-white">
                            <tr>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4">Description</th>
                                <th className="py-3 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseTransactions.length > 0 ? (
                                expenseTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b hover:bg-gray-100">
                                        <td className="py-3 px-4 text-red-600 font-medium">${Number(transaction.amount).toFixed(2)}</td>
                                        <td className="py-3 px-4">{transaction.category}</td>
                                        <td className="py-3 px-4">{transaction.description}</td>
                                        <td className="py-3 px-4">{new Date().toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-gray-500">No expense transactions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
