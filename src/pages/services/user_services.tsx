import axios from "axios";

// Define the API endpoint
const API_URL = "http://localhost:6930/api/users"; // Adjust this if your backend URL is different

export interface SignupData {
  name: string;
  contact: string;
  email: string;
  password: string;
  role: string;
}
export interface SigninData {
  email: string;
  password: string;
}

// Create User Function
export const createUser = async (userData: SignupData) => {
  console.log("This is the user data", userData);
  try {
    // Make the POST request to create a new user
    const response = await axios.post(`${API_URL}/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle the response (success or failure)
    if (response.status === 201) {
      // Return the user data and token if successful
      return response.data;
    } else {
      // Handle error from backend
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    // Handle errors during the API request
    console.error("Error creating user:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};
// Create User Function
export const loginUser = async (userData: SigninData) => {
  console.log("This is the user data", userData);
  try {
    console.log("here")
    // Make the POST request to create a new user
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response)

    // Handle the response (success or failure)
    if (response.status === 201 ||response.status === 200  ) {
      // Return the user data and token if successful
      return response.data;
    } else {
      // Handle error from backend
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    // Handle errors during the API request
    console.error("Error login in:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};
