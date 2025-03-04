import axios from "axios";

const BASE_URL = "https://evolvefinancial-backend-test.vercel.app/api/invoices";

export interface InvoiceData {
  _id?: string;
  invoiceId: string;
  customerId: string;
  staffId: string;
  companyName: string;
  productList: ProductItem[];
  subtotal: number;
  taxAmount: number;
  transactionFee: number;
  platformFee: number;
  totalAmount: number;
  paymentStatus: "Pending" | "Completed" | "Failed";
  status: "Pending" | "Completed" | "Failed";
  paymentMethod: string;
  receiptReference: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
}

// Get All Products (Optimized)
export const getInvoices = async (role: string, token: string) => {
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

    return response.data.invoices;
  } catch (error: any) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to fetch products");
  }
};

// Get Product by ID
export const getInvoiceById = async (
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

// Create Invoice
export const createInvoice = async (invoiceData: any, token: string) => {
  try {
    const response = await axios.post(BASE_URL, invoiceData, {
      headers: {
        "Content-Type": "application/json",
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
      "Error creating invoice:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Error creating invoice");
  }
};
