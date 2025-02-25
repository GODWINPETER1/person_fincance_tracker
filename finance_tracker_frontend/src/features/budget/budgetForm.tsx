import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store"; // Ensure correct dispatch type
import { createBudget } from "@/features/budget/budgetSlice";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";

const BudgetForm = () => {
  const dispatch = useDispatch<AppDispatch>(); // Correct dispatch type
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    spent: "",
    month: "",
    year: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert to correct types
    const newBudget = {
      id: Date.now(), // Temporary ID (backend should override)
      userId: 1, // Replace with actual user ID from auth
      category: formData.category,
      amount: Number(formData.amount), // Convert amount to number
      spent: Number(formData.spent),
      month: Number(formData.month), // Convert month to number
      year: Number(formData.year), // Convert year to number
    };

    dispatch(createBudget(newBudget)); // Dispatch correct object

    // Reset form
    setFormData({ category: "", amount: "", spent: "", month: "", year: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      <Input
        label="category"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <Input
        label="amount"
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <Input
        label="spent"
        name="spent"
        type="number"
        placeholder="spent"
        value={formData.spent}
        onChange={handleChange}
        required
      />
      <Input
        label="month"
        name="month"
        type="number"
        placeholder="Month (1-12)"
        value={formData.month}
        onChange={handleChange}
        required
      />
      <Input
        label="year"
        name="year"
        type="number"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="w-full">Add Budget</Button>
    </form>
  );
};

export default BudgetForm;
