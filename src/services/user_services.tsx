import axios from "axios";

// Define the API endpoint
// const API_URL = "https://evolvefinancial-backend-test.vercel.app/api/users"; // Adjust this if your backend URL is different
const API_URL = "https://evolvefinancial-backend-test.vercel.app/api/users"; // Adjust this if your backend URL is different

export interface SignupData {
  name: string;
  contact: string;
  email: string;
  password: string;
  role: string;
  companyName: string;
}
export interface SigninData {
  email: string;
  password: string;
}
export interface OTPMessage {
  email: string;
  otp: string;
  name: String;
  messageType: String;
}
export interface EmailVerification {
  email: string;
}
export interface ResetPassword {
  email: string;
  password: string;
}
export interface OTPVerification {
  email: string;
  otp: string;
}
export interface OTPGeneration {
  email: string;
}

// Define the user type
export interface User {
  _id: string;
  userId: string;
  contact: string;
  name: string;
  email: string;
  password: string;
  role: string;
  companyName?: string;
  isActive: boolean;
  totalRevenue: any[]; // Adjust types as needed
  totalProducts: any[]; // Adjust types as needed
  transactionHistory: any[]; // Adjust types as needed
  createdAt: string;
  updatedAt: string;
  __v: number;
}
// Create User Function
export const createUser = async (userData: SignupData) => {
  // //console.log("This is the user data", userData);
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
    // //console.error("Error creating user:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};
// Create User Function
export const loginUser = async (userData: SigninData) => {
  // //console.log("This is the user data", userData);
  try {
    // //console.log("here");
    // Make the POST request to create a new user
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // //console.log(response);

    // Handle the response (success or failure)
    if (response.status === 201 || response.status === 200) {
      // Return the user data and token if successful
      return response.data;
    } else {
      // Handle error from backend
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    // Handle errors during the API request
    // //console.error("Error login in:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Function to fetch user by ID and role
export const getUserById = async (userId: string, role: string, token: string) => {
  // //console.log("getting user by ID...")
  try {
    
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sending token for authentication
      },
      params: { role }, // Sending role in query parameters
    });
    // //console.log("response", response)

    return response; // Return user data
  } catch (error: any) {
    //console.error("Error fetching user:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to fetch user details");
  }
};

// Create User Function
export const requestOTP = async (userData: OTPGeneration) => {
  //console.log("Requesting OTP...");
  try {
    //console.log("here");
    // Make the POST request to create a new user
    const response = await axios.post(`${API_URL}/generate-otp`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    //console.log(response);

    // Handle the response (success or failure)
    if (response.status === 201 || response.status === 200) {
      // Return the user data and token if successful
      return response.data;
    } else {
      // Handle error from backend
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    // Handle errors during the API request
    //console.error("Error login in:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};
export const verifyOTP = async (userData: OTPVerification) => {
  //console.log("Verifying OTP...");
  try {
    //console.log("here");
    // Make the POST request to create a new user
    const response = await axios.post(`${API_URL}/verify-otp`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    //console.log(response);

    // Handle the response (success or failure)
    if (response.status === 201 || response.status === 200) {
      // Return the user data and token if successful
      return response.data;
    } else {
      // Handle error from backend
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    // Handle errors during the API request
    //console.error("Error login in:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};
export const sendOTPMessage = async (userData: OTPMessage) => {
  //console.log("Sending OTP...");
  try {
    //console.log("here");
    // Make the POST request to create a new user
    const response = await axios.post(`${API_URL}/send-otp`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    //console.log(response);

    // Handle the response (success or failure)
    if (response.status === 201 || response.status === 200) {
      // Return the user data and token if successful
      return response.data;
    } else {
      // Handle error from backend
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    // Handle errors during the API request
    //console.error("Error login in:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};
export const verifyEmail = async (userData: EmailVerification) => {
  //console.log("Sending OTP...");
  try {
    //console.log("here");
    // Make the POST request to create a new user
    const response = await axios.post(
      `${API_URL}/email-verification`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //console.log(response);

    // Handle the response (success or failure)
    if (response.status === 201 || response.status === 200) {
      // Return the user data and token if successful
      return response.data;
    } else {
      // Handle error from backend
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    // Handle errors during the API request
    //console.error("Error login in:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};
export const resetPassword = async (userData: ResetPassword) => {
  //console.log("resetting password...");
  try {
    //console.log("here");
    // Make the POST request to create a new user
    const response = await axios.post(`${API_URL}/reset-password`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    //console.log(response);

    // Handle the response (success or failure)
    if (response.status === 201 || response.status === 200) {
      // Return the user data and token if successful
      return response.data;
    } else {
      // Handle error from backend
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    // Handle errors during the API request
    //console.error("Error login in:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};
export const removeAllData = async () => {
  try {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
  } catch (error: any) {
    //console.error("Error logging out:", error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};
