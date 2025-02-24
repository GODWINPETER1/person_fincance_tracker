import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchTransactions } from '@/features/transactions/transactionSlice';
import Chart from '@/components/charts/charts';
import ErrorBoundary from '@/components/error/errorBoundary';

interface MonthlyData {
  labels: string[];
  income: number[];
  expenses: number[];
}

const Budgets = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading, error } = useSelector((state: RootState) => state.transactions);

  const [monthlyData, setMonthlyData] = useState<MonthlyData>({
    labels: [],
    income: [],
    expenses: [],
  });

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactions.length > 0) {
      // Define all months from Jan to Dec
      const allMonths = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ];

      // Initialize income and expenses for each month
      const income = new Array(12).fill(0);
      const expenses = new Array(12).fill(0);

      // Group transactions by month
      transactions.forEach((transaction) => {
        const date = new Date(transaction.date);
        const monthIndex = date.getMonth(); // 0 (Jan) to 11 (Dec)

        if (transaction.type === 'income') {
          income[monthIndex] += transaction.amount;
        } else if (transaction.type === 'expense') {
          expenses[monthIndex] += transaction.amount;
        }
      });

      // Set the data
      setMonthlyData({
        labels: allMonths,
        income,
        expenses,
      });
    }
  }, [transactions]);

  if (loading) return <p className="text-center text-indigo-500 text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg font-semibold">Error: {error}</p>;

  return (
    <div className="max-w-6xl w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Monthly Income vs. Expenses</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ErrorBoundary>
          <Chart
            incomeData={monthlyData.income}
            expenseData={monthlyData.expenses}
            labels={monthlyData.labels}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Budgets;