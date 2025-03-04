import axios from "axios";

// Define the API endpoint
const BASE_URL = "https://evolvefinancial-backend-test.vercel.app/api/products"; // Adjust this if your backend URL is different

export interface ProductData {
  _id?: string;
  name: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  stockLevel: number;
  discount: number;
  userId: string;
  companyName: string;
  userName: string;
  productImage?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface CreateProductData {
  name: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  stockLevel: number;
  discount: number;
  productImage?: File | null;
}

// Get All Products (Optimized)
export const getProducts = async (role: string, token: string) => {
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

    return response.data.products;
  } catch (error: any) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to fetch products");
  }
};

// Get Product by ID
export const getProductById = async (
  id: string,
  companyName: string,
  role: string,
  token: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sending token for authentication
      },
      params: { role, companyName }, // Sending role in query parameters
    });
    // console.log(response);

    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching product:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Error fetching product");
  }
};

// Create Product
export const createProduct = async (formData: FormData, token: string) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    // Handle the response (success or failure)
    if (response.status === 201) {
      // Return the user data and token if successful
      return response.data;
    } else {
      // Handle error from backend
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Error creating product");
  }
};

// Function to update a product by ID
export const updateProductById = async (
  productId: string,
  updatedData: FormData, // Accept FormData
  token: string
) => {
  // console.log("Formdata is: ", updatedData)
  try {
    const response = await axios.put(`${BASE_URL}/${productId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to update product");
  }
};


export const deleteProductById = async (productId: string, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to delete product");
  }
};
