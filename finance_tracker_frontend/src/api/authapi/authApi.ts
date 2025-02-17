// Handle api calls

import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
    try {
      
      const response = await axios.post(`${API_URL}/register`, userData);
      console.log(response)
      return response.data;
    } catch (error) {

      if (axios.isAxiosError(error)) {
        console.error("Registration Error:", error.response?.data); // Log the server's error response
      } else {
        console.error("Unexpected Error:", error);
      }

      throw error; // Re-throw the error to handle it in the component
    }
  };

// Login function to handle an api call
export const loginUser = async (loginUserData: {email: string , password: string}) => {

  try {
    const response = await axios.post(`${API_URL}/login` , loginUserData);
    console.log(response)
    return response.data

  } catch (error) {
    if(axios.isAxiosError(error)) {
      console.error("Login Error:" , error.response?.data) 
    } else {
      console.error("Unexpected Error:" , error)
    }
    throw error;
  }

}
