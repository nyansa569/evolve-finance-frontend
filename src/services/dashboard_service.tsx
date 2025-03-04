import axios from "axios";

const BASE_URL = "https://evolvefinancial-backend-test.vercel.app/api/dashboard";



// Get All Products (Optimized)
export const getDashboardData = async (role: string, token: string) => {
    // console.log("Getting dashboard data...")
    if (!token) {
      throw new Error("Authentication token is required");
    }
  
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { role }, // CompanyName is handled by the backend
      });
  
      return response.data;
    } catch (error: any) {
      console.error(
        "Error dashboard products:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.error || "Failed to fetch dashboard");
    }
  };
