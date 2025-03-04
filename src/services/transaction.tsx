import axios from "axios";

const BASE_URL =
  "https://evolvefinancial-backend-test.vercel.app/api/transactions";

export interface TransactionData {
  _id?: string;
  transactionId: string;
  invoiceId: string;
  userId: string;
  userName: string;
  companyName: string;
  role: string;
  paymentMethod: "Mobile Money" | "Cash" | "Bank" | "Card";
  paymentStatus: "pending" | "completed" | "failed";
  transactionFee: number;
  platformFee: number;
  amountPaid: number;
  accountName?: string;
  accountNumber?: string;
  mobileMoneyNumber?: string;
  cardType?: "Visa" | "MasterCard";
  bankName?: string;
  bankLocation?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Get All Transactions
export const getTransactions = async (role: string, token: string) => {
  if (!token) {
    throw new Error("Authentication token is required");
  }
  try {
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
      params: { role },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching transactions:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Failed to fetch transactions"
    );
  }
};

// Get Transaction by ID
export const getTransactionById = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching transaction:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Error fetching transaction"
    );
  }
};

// Create Transaction
export const createTransaction = async (
  transactionData: any,
  token: string
) => {
  try {
    const response = await axios.post(BASE_URL, transactionData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Something went wrong!");
    }
  } catch (error: any) {
    console.error(
      "Error creating transaction:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Error creating transaction"
    );
  }
};
