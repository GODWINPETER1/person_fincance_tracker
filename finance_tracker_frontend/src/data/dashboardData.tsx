import { useSelector} from "react-redux";
import { RootState } from "@/store/store";

export const GetDashboardData = () => {

    const { transactions } = useSelector((state: RootState) => state.transactions);

    const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum , t) => sum + Number(t.amount) , 0);
    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum , t) => sum + Number(t.amount) , 0)
    const totalBalance = totalIncome - totalExpenses;
    
    return [
        {
            id: 1,
            title: "Total Income",
            description: "Total earning this month",
            content: `${totalIncome.toFixed(2)}`,
            footer: "Updated just now",
            type: "Income"
        },
        {
            id: 2,
            title: "Total Expenses",
            description: "Total spent this month",
            content: `${totalExpenses.toFixed(2)}`,
            footer: "Updated just now",
            type: "Expenses"
        },
        {
            id: 2,
            title: "Total Balance",
            description: "Income - Expenses",
            content: `${totalBalance.toFixed(2)}`,
            footer: "Keep track of your spending"
        }
    ]
}