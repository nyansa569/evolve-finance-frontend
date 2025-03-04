import { useState, useEffect } from "react";
import { BEST_SELLINGS } from "@/components/constants";
import { DataTableUnpaginate } from "@/components/shared/table/non-paginate-table";
import { getInvoices } from "@/services/invoice_services";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/table";

export interface InvoiceData {
  _id: string;
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

function BestSelling() {
  const [loading, setLoading] = useState(false);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);

  const token = localStorage.getItem("token") || "";
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role || "";
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await getInvoices(role, token);
      // console.log("response for invoices", response);

      setInvoices(response || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const columns: ColumnDef<InvoiceData>[] = [
    {
      accessorKey: "invoiceId",
      header: "No.",
      cell: ({ row }) => (
        <div className="text-center">{row.original.invoiceId.slice(0, 3)}...</div>
      ),
    },
    {
      accessorKey: "itemNo",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Item(s) No. {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.productList.length}</div>
      ),
    },
    {
      accessorKey: "subTotal",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Subtotal {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">${row.original.subtotal}</div>
      ),
    },
    {
      accessorKey: "taxAmount",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Tax Amount {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">${row.original.taxAmount}</div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Total Amount {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">${row.original.totalAmount}</div>
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
        const status = row.original.status;
        const statusStyles = {
          Pending: "bg-yellow-100 text-yellow-700",
          Completed: "bg-green-100 text-green-700",
          Failed: "bg-red-100 text-red-700",
          Unknown: "bg-gray-100 text-gray-700",
        };

        return (
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
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
    <div className="max-w-full space-y-3">
      <div className="p-6">
        <DataTable
          title="Best Selling Products"
          inputKey="invoiceId"
          inputPlaceholder="Search invoice id..."
          columns={columns}
          data={invoices}
          // onClickCell={(d) => console.log("Selected invoice:", d)}
        />
      </div>
    </div>
  );
}

export default BestSelling;
