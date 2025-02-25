// configure redux store
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/features/auth/authSlice";
import transactionSlice from "@/features/transactions/transactionSlice";
import budgetSlice from "@/features/budget/budgetSlice"


export const store = configureStore({

    reducer: {
        auth: authSlice,
        transactions: transactionSlice,
        budgets: budgetSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;