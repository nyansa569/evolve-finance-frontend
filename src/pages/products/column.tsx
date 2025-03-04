// import { ProductProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";
interface Product {
  id: string;
  name: string;
  costPrice: number;
  sellingPrice: number;
  stockLevel: number;
  discount: number;
  productId: string;
  image?: string; // Optional if not always present
}


export type ProductProps = {
  id: string;
  product_name: string;
  image: string;
  price: string;
  quantity: number;
  availability: "Not available" | "Available",
  branch: string;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Product Image",
    cell: ({ row }) => {
      const value: string = row.original.image || "https://via.placeholder.com/100"; // Placeholder if no image
      return (
        <div className="flex items-center gap-2 md:w-auto">
          <img
            src={value}
            alt="Product"
            className="w-20 h-12 object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
    cell: ({ row }) => `$${row.original.costPrice}`,
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
    cell: ({ row }) => `$${row.original.sellingPrice}`,
  },
  {
    accessorKey: "stockLevel",
    header: "Stock Level",
  },
  {
    accessorKey: "discount",
    header: "Discount (%)",
    cell: ({ row }) => `${row.original.discount}%`,
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center sm:gap-5 gap-3">
        <div className="text-accent-200">
          <PencilLine size={18} />
        </div>
        <div className="text-accent-200">
          <Trash2 size={18} />
        </div>
      </div>
    ),
  },
];