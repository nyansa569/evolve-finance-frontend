import { OrdersProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";

export const columns: ColumnDef<OrdersProps>[] = [
    {
      accessorKey: "id",
      header: "No.",
    },
    {
      accessorKey: "order_id",
      header: "Order Id",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "product",
      header: "Product",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => {
        const value: string = row.original.status;
  
        return (
          <div className={`w-fit px-4 py-2 text-[13px] border-2 ${value === "Success" ? "border-green-500" : "border-red-500"} rounded-xl`}>
            {value}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: () => {
        return (
          <div className="flex items-center sm:gap-5 gap-3">
            <div className="text-accent-200">
              <PencilLine size={18} />
            </div>
            <div className="text-accent-200">
              <Trash2 size={18} />
            </div>
          </div>
        )
      },
    },
  ];
  