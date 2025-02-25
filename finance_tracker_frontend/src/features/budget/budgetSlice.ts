import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {getAllTheBudget , addBudget , updateBudget , deleteBudget , Budget} from "../../api/budget/budget";



// async thunks
export const fetchBudgets = createAsyncThunk("budgets/fetch" , async () => {
    return await getAllTheBudget();
});

export const createBudget = createAsyncThunk("budgets/create" , async (budget: Budget) => {
    return await addBudget(budget)
})

export const editBudget = createAsyncThunk("budget/edit" , async ({id , budget} : {id: number , budget: Budget}) => {
    return updateBudget(id , budget)
})

export const removeBudget = createAsyncThunk("budget/delete" , async (id: number) => {
    return deleteBudget(id)
})

const initialState = {
    budgets: [] as Budget[],
    loading: false,
    error: null as string | null
}

// slice
const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetch budgets
        .addCase(fetchBudgets.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchBudgets.fulfilled , (state , action) => {
            state.loading = false;
            state.budgets = action.payload;
        })
        .addCase(fetchBudgets.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message || "failed to fetch"
        })

        // create budget
        .addCase(createBudget.pending , (state) => {
            state.loading = true
        })
        .addCase(createBudget.fulfilled , (state , action) => {
            state.loading = false;
            console.log("Budget created:", action.payload); // Debugging
            state.budgets.push(action.payload);
        })
        .addCase(createBudget.rejected , (state , action) => {
            state.loading = false;
            console.error("Error creating budget:", action.error); // Debugging
            state.error = action.error.message || "failed to create budget"
        })

        // edit budget
        .addCase(editBudget.pending , (state) => {
            state.loading = true;
        })
        .addCase(editBudget.fulfilled , (state , action) => {
            state.loading = false;
            const index = state.budgets.findIndex((b) => b.id === action.payload.id);
            if (index !== -1) {
                state.budgets[index] = action.payload;
            }
        })
        .addCase(editBudget.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to edit budget"
        })

        // Delete Budget
        .addCase(removeBudget.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeBudget.fulfilled, (state, action) => {
            state.loading = false;
            state.budgets = state.budgets.filter((b) => b.id !== action.meta.arg);
        })
        .addCase(removeBudget.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to delete budget.";
        });
    }
})
export default budgetSlice.reducer;