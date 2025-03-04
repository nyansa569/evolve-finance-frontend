import { useState, useEffect } from "react";
import HeaderTitle from "@/components/shared/title";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { getInvoices } from "@/services/invoice_services";
import { DataTable } from "@/components/shared/table";
import AddInvoicePage from "../add-products/add-invoice";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

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
function InvoicePage() {
  const navigate = useNavigate();
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
      // console.log("response", response);
      setInvoices(response || []);
    } catch (error) {
      // console.error(error);
      navigate("/signin");
    }
    setLoading(false);
  };

  const exportInvoicesToExcel = () => {
    if (!invoices || invoices.length === 0) {
      console.error("No invoices to export");
      return;
    }

    // Find the max number of products in any invoice to determine the columns needed
    const maxProducts = Math.max(
      ...invoices.map((invoice) => invoice.productList.length),
      0
    );

    // Prepare data
    const data = invoices.map((invoice) => {
      const row: any = {
        Invoice_ID: invoice.invoiceId,
        Customer_ID: invoice.customerId,
        Staff_ID: invoice.staffId,
        Company_Name: invoice.companyName,
        Payment_Status: invoice.paymentStatus,
        Status: invoice.status,
        Payment_Method: invoice.paymentMethod,
        Receipt_Reference: invoice.receiptReference,
        Subtotal: invoice.subtotal,
        Tax_Amount: invoice.taxAmount,
        Transaction_Fee: invoice.transactionFee,
        Platform_Fee: invoice.platformFee,
        Total_Amount: invoice.totalAmount,
        Product_List: invoice.productList.length,
      };

      // Add products dynamically
      invoice.productList.forEach((product, index) => {
        row[`Product_${index + 1}_Name`] = product.name;
        row[`Product_${index + 1}_Price`] = product.price;
        row[`Product_${index + 1}_Discount`] = product.discount;
        row[`Product_${index + 1}_Quantity`] = product.quantity;
      });

      // Ensure all rows have the same number of columns
      for (let i = invoice.productList.length; i < maxProducts; i++) {
        row[`Product_${i + 1}_Name`] = "";
        row[`Product_${i + 1}_Price`] = "";
        row[`Product_${i + 1}_Discount`] = "";
        row[`Product_${i + 1}_Quantity`] = "";
      }

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
    XLSX.writeFile(workbook, `Invoice_${formattedDate}.xlsx`);
  };

  const columns: ColumnDef<InvoiceData>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="text-center">{row.original._id.slice(0, 3)}...</div>
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
        <div className="text-center">{row.original.customerId}</div>
      ),
    },
    {
      accessorKey: "staffId",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Staff ID {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.staffId}</div>
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
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          Payment Status {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.paymentStatus}</div>
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
    <div className="w-full h-full py-8">
      <section className="max-container lg:w-[80%] w-[90%] mx-auto pb-8">
        <div className="pb-4 flex justify-between items-center gap-4">
          <HeaderTitle
            title={isCreatingInvoice ? "Create Invoice" : "Invoice History"}
          />
          <Button variant="secondary" onClick={exportInvoicesToExcel}>
            Export In Excel
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsCreatingInvoice(!isCreatingInvoice)}
          >
            {isCreatingInvoice ? "Back to Invoice History" : "Create Invoice"}
          </Button>
        </div>

        {isCreatingInvoice ? (
          <AddInvoicePage />
        ) : invoices.length < 1 ? (
          <div className="w-full xl:h-[550px] sm:h-[400px] h-[300px] flex flex-col justify-center items-center border rounded-xl">
            <p className="text-lg font-semibold mb-4">
              No invoice created yet.
            </p>
            <p className="text-sm mb-6">Create an invoice to get started.</p>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200">
              Create Invoice
            </button>
          </div>
        ) : (
          <div className="w-full">
            <DataTable
              title="Invoice list"
              inputKey="invoiceId"
              inputPlaceholder="Search invoice id..."
              columns={columns}
              data={invoices}
              // onClickCell={(d) => console.log("Selected invoice:", d)}
              // initialSort={[
              //   {
              //     id: "sellingPrice",
              //     desc: true,
              //   },
              // ]}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default InvoicePage;
