// Handle global authentication state

import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { registerUser } from "@/api/authapi/authApi";
import { AxiosError } from "axios";

// define the expected structure for user data
interface RegisterUserData {
    name: string;
    email: string;
    password: string
}

interface AuthState {
    user: string | null | number;
    loading: boolean;
    error: string | null
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

// createAsyncThunk - accepts an action type string and a function that returns a promise
// and generate a thunk that dispatches pending/fulfilled/rejected action types based on that promise.

export const register = createAsyncThunk("auth/register" , async (userData: RegisterUserData , {rejectWithValue}) => {

    try {
        // calls the registerUser: API function to send the registration request to the server
        return await registerUser(userData);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.message || " Registration failed ")
        }
        
    }
})

// createSlice() function that accepts an initial state, an object of reducer functions
// and a slice name, and automatically generates action creators and action types that corresponding to the reducer and state.
const authSlice = createSlice({
    // a name, used in action types
    name: "auth",
    // The initial state for the reducer
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {

            state.loading = true;
            state.error = null
        })

        .addCase(register.fulfilled, (state , action) => {
            state.loading = false;
            state.user = action.payload;
        })

        .addCase(register.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload as string
        })
    }
})

export default authSlice.reducer;