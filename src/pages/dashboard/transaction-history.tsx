// import { columns } from './transaction-column';
import { TRANSACTION_HISTORY } from "@/components/constants";
import { DataTableUnpaginate } from "@/components/shared/table/non-paginate-table";
import { useState, useEffect } from "react";
import { getTransactions } from "@/services/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/table";

export interface TransactionData {
  _id: string;
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

function TransactionHistory() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const token = localStorage.getItem("token") || "";
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role || "";

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    // console.log("This is token: ", token);
    // console.log("This is role: ", role);
    try {
      setLoading(true);
      const response = await getTransactions(role, token);
      // console.log("response for tranaction", response);
      setTransactions(response || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const columns: ColumnDef<TransactionData>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-center">{row.original.createdAt}</div>
      ),
    },
    {
      accessorKey: "invoiceId",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Invoice ID {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.invoiceId}</div>
      ),
    },
    {
      accessorKey: "transactionId",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Transaction ID {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.transactionId}</div>
      ),
    },
    {
      accessorKey: "amountPaid",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Total Amount {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">₵{row.original.amountPaid}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const value: string = row.original.paymentStatus;

        return (
          <div
            className={`w-fit px-3 py-1 text-[13px] border-2 ${
              value === "Paid" ? "border-green-500" : "border-red-500"
            } rounded-xl`}
          >
            {value}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full space-y-3">
      <div className="p-6">
        <DataTable
          title="Transaction History"
          inputKey="transactionId"
          inputPlaceholder="Search transaction id..."
          columns={columns}
          data={transactions}
          // onClickCell={(d: any) => console.log("Selected invoice:", d)}
        />
      </div>
    </div>
  );
}

export default TransactionHistory;
