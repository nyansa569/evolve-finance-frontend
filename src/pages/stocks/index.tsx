import { useState, useEffect } from "react";
import HeaderTitle from "@/components/shared/title";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { getTransactions } from "@/services/transaction";
import { DataTable } from "@/components/shared/table";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

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

function StocksPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
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
      // console.error(error);
      navigate("/signin");
    }
    setLoading(false);
  };

  const exportInvoicesToExcel = () => {
    if (!transactions || transactions.length === 0) {
      console.error("No invoices to export");
      return;
    }

    // Prepare data
    const data = transactions.map((transaction) => {
      const row: any = {
        Transaction_ID: transaction.transactionId,
        Invoice_ID: transaction.invoiceId,
        User_ID: transaction.userId,
        Company_Name: transaction.companyName,
        User_Name: transaction.userName,
        Role: transaction.role,
        Payment_Method: transaction.paymentMethod,
        Payment_Status: transaction.paymentStatus,
        Transaction_Fee: transaction.transactionFee,
        Amount_Paid: transaction.amountPaid,
        MobileMoney_Number: transaction.mobileMoneyNumber,
        Card_Type: transaction.cardType,
        Platform_Fee: transaction.platformFee,
        Description: transaction.description,
        createdAt: transaction.createdAt,
      };

      return row;
    });

    const now = new Date();
    const formattedDate = now
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/[^\w\s]/gi, "")
      .replace(" ", "");

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

    // Save workbook with the formatted date as part of the filename
    XLSX.writeFile(workbook, `Transaction_${formattedDate}.xlsx`);
  };


  const columns: ColumnDef<TransactionData>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="text-center">{row.original._id.slice(0, 3)}...</div>
      ),
    },
    {
      accessorKey: "transactionId",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Invoice ID {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.transactionId}</div>
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
      accessorKey: "customerId",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Customer ID {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.userId}</div>
      ),
    },
    {
      accessorKey: "userName",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Staff ID {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.userName}</div>
      ),
    },
    {
      accessorKey: "companyName",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Item(s) No. {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.companyName}</div>
      ),
    },
    {
      accessorKey: "transactionFee",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Subtotal {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">₵{row.original.transactionFee}</div>
      ),
    },
    {
      accessorKey: "platformFee",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Tax Amount {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">₵{row.original.platformFee}</div>
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
      accessorKey: "paymentMethod",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Payment Status {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.paymentMethod}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Invoice Status {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        const statusStyles = {
          pending: "bg-yellow-100 text-yellow-700",
          completed: "bg-green-100 text-green-700",
          failed: "bg-red-100 text-red-700",
          Unknown: "bg-gray-100 text-gray-700",
        };

        return (
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ₵{
              statusStyles[status] || statusStyles.Unknown
            } flex justify-center items-center w-full text-center`}
          >
            {status}
          </div>
        );
      },
    },
  ];
  return (
    <div className="w-full h-full py-8">
      <section className="max-container lg:w-[80%] w-[90%] mx-auto pb-8">
        <div className="pb-4 flex justify-between items-center gap-4">
          <HeaderTitle
            title={isCreatingInvoice ? "Create Invoice" : "Invoice History"}
          />
          <Button variant="secondary" onClick={exportInvoicesToExcel}>
          Export In Excel
        </Button>
         
        </div>

        <div className="w-full">
          <DataTable
            title="Invoice list"
            inputKey="invoiceId"
            inputPlaceholder="Search invoice id..."
            columns={columns}
            data={transactions}
            // onClickCell={(d) => console.log("Selected invoice:", d)}
          />
        </div>
      </section>
    </div>
  );
}

export default StocksPage;
