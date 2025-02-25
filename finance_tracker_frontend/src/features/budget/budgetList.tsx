import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import BudgetCard from "./budgetCard";
import ErrorBoundary from "@/components/error/errorBoundary";

const BudgetList = () => {

    const { budgets , loading, error } = useSelector((state: RootState) => state.budgets);

    if (loading) return <p className="text-center text-gray-500"> loading... </p>
    if (error) return <p className="text-center text-red-500">{error}</p>
    if (!budgets || budgets.length === 0) {
        return <p className="text-center text-gray-500">No budgets available.</p>;
      }
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">

            {
        
                    budgets.map((budget) => (
                       <ErrorBoundary>
                          <BudgetCard
                           key={budget.userId}
                           category={budget.category}
                           amount={budget.amount}
                           month={budget.month}
                           year={budget.year}
                        />
                       </ErrorBoundary> 
                        
                    ))
            }
        </div>
    )
}
export default BudgetList;