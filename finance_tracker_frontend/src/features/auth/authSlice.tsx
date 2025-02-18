// Handle global authentication state

import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { loginUser, registerUser } from "@/api/authapi/authApi";
import { AxiosError } from "axios";

// define the expected structure for registration data
interface RegisterUserData {
    name: string;
    email: string;
    password: string
}

// Define the expected structure for login data
interface LoginUserData {
    email: string;
    password: string;
}

interface AuthState {
    token: string | null,
    user: {message : string , name: string}  | null | number;
    loading: boolean;
    error: string | null
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
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

// createAsyncThunk for login
export const login = createAsyncThunk("auth/login" , async(loginUserData: LoginUserData , {rejectWithValue}) => {

    try {
        return loginUser(loginUserData);
    } catch (error: unknown) {

        if (error instanceof AxiosError) {
            console.error("Login Error" , error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Login failed")
        }

        return rejectWithValue("An unexpected error occurred.")
    }
})

// createSlice() function that accepts an initial state, an object of reducer functions
// and a slice name, and automatically generates action creators and action types that corresponding to the reducer and state.
const authSlice = createSlice({
    // a name, used in action types
    name: "auth",
    // The initial state for the reducer
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null
            localStorage.removeItem("token")
        }
    },
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
            state.error = action.payload as null
        })

        // login case
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        .addCase(login.fulfilled , (state , action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token
            state.error = null 
        })

        .addCase(login.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload as null
        })
    }

})

export const { logout } = authSlice.actions;
export default authSlice.reducer;