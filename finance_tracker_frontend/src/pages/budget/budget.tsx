import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchBudgets } from "../../features/budget/budgetSlice";
import BudgetList from "../../features/budget/budgetList";
import BudgetForm from "../../features/budget/budgetForm";
import { Button } from "@/components/button/button";
import { Dialog, DialogOverlay, DialogContent } from "@/components/dialog/dialog";

const BudgetPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showForm, setShowForm] = useState(false); // State to control dialog visibility

  useEffect(() => {
    dispatch(fetchBudgets());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Budget Management</h1>

      {/* Button to open the form dialog */}
      <div className="w-full p-6 justify-center">
        <Button
          className="py-2 px-6 rounded-lg shadow-lg"
          onClick={() => setShowForm(true)}
        >
          Add Budget
        </Button>
      </div>

      {/* Budget List */}
      <div className="bg-white p-4 shadow rounded-md">
        <h2 className="text-lg font-semibold mb-2">Your Budgets</h2>
        <BudgetList />
      </div>

      {/* Dialog for Budget Form */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a New Budget</h2>
          <BudgetForm />
          <div className="flex justify-end mt-4">
            <Button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setShowForm(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BudgetPage;