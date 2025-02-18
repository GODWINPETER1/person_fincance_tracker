import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction, Transaction } from "../../api/transaction/transactionApi";

// Async Thunks
export const fetchTransactions = createAsyncThunk("transactions/fetch", async () => {
    return await getTransactions();
});

export const createTransaction = createAsyncThunk("transactions/create", async (transaction: Transaction) => {
    return await addTransaction(transaction);
});

export const editTransaction = createAsyncThunk("transactions/edit", async ({ id, transaction }: { id: number; transaction: Partial<Transaction> }) => {
    return await updateTransaction(id, transaction);
});

export const removeTransaction = createAsyncThunk("transactions/delete", async (id: number) => {
    await deleteTransaction(id);
    return id;
});

// Slice
const transactionSlice = createSlice({
    name: "transactions",
    initialState: {
        transactions: [] as Transaction[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch transactions";
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.transactions.push(action.payload);
            })
            .addCase(editTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.map((transaction) =>
                    transaction.id === action.payload.id ? action.payload : transaction
                );
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
            });
    },
});

export default transactionSlice.reducer;
