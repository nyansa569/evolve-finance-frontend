import { DataTable } from "@/components/shared/table";
import HeaderTitle from "@/components/shared/title";
import { Button } from "@/components/ui/button";
import { Plus, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteProductById, getProducts } from "@/services/products_services";
import AddProductsPage from "../add-products";
import EditProductPage from "../add-products/edit-products"; // Import EditProductPage
import { ColumnDef } from "@tanstack/react-table";
import Modal from "../../components/modal/modal";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
interface Product {
  _id: string;
  name: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  stockLevel: number;
  discount: number;
  companyName: string;
  userId: string;
  productImage: string;
}

function ProductsPage() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || "";
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role || "";

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(role, token);
      setProducts(response || []);
    } catch (error) {
      // console.error(error);
      navigate("/signin");
    }
    setLoading(false);
  };

  // Handle opening delete confirmation modal
  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // Handle closing delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // Function to delete the product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      await deleteProductById(productToDelete._id, token);
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const exportToExcel = () => {
    if (products.length === 0) {
      alert("No data to export!");
      return;
    }

    // Define the data structure
    const exportData = products.map(
      ({
        _id,
        name,
        description,
        companyName,
        costPrice,
        sellingPrice,
        userId,
        stockLevel,
        discount,
        productImage,
      }) => ({
        ID: _id,
        "Product Name": name,
        "Product Description": description,
        "Company Name": companyName,
        "Staff Id": userId,
        "Cost Price": costPrice,
        "Selling Price": sellingPrice,
        "Stock Level": stockLevel,
        "Discount (%)": discount,
        "Product image link": productImage,
      })
    );

    // Create a new worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    // Download the file
    XLSX.writeFile(wb, "Products_List.xlsx");
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => `${row.original._id.slice(0, 3)}...`,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
    },
    {
      accessorKey: "costPrice",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cost Price {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => `$${row.original.costPrice}`,
    },
    {
      accessorKey: "sellingPrice",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Selling Price {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
      cell: ({ row }) => `$${row.original.sellingPrice}`,
    },
    {
      accessorKey: "stockLevel",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock Level {column.getIsSorted() === "asc" ? "▲" : "▼"}
        </button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <PencilLine
            size={18}
            className="text-blue-500 cursor-pointer"
            onClick={() => openEditModal(row.original)}
          />
          <Trash2
            size={18}
            className="text-red-500 cursor-pointer"
            onClick={() => openDeleteModal(row.original)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full py-8">
      <section className="max-container lg:w-[80%] w-[90%] mx-auto pb-8">
        <div className="pb-8 flex justify-between items-center gap-4">
          <HeaderTitle title="Products" />
          <Button variant="secondary" onClick={exportToExcel}>
            Export In Excel
          </Button>

          <Button
            variant="primary"
            className="flex justify-center gap-2"
            onClick={openCreateModal}
          >
            <Plus size={18} />
            Add products
          </Button>
        </div>

        {/* Create Product Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          title="Create a product"
        >
          <AddProductsPage />
        </Modal>

        {/* Edit Product Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title="Edit Product"
        >
          {selectedProduct && (
            <EditProductPage
              product={selectedProduct}
              onClose={closeEditModal}
            />
          )}
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          title="Confirm Delete"
        >
          <p style={{ color: "white" }}>
            Are you sure you want to delete <b>{productToDelete?.name}</b>?
          </p>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="secondary" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              disabled={isDeleting}
            >
              {isDeleting ? "Loading..." : "Delete"}
            </Button>
          </div>
        </Modal>

        {/* Product Table */}
        <DataTable
          title="Product list"
          inputKey="name"
          inputPlaceholder="Search product..."
          columns={columns}
          data={products}
          onClickCell={(d) => console.log("Selected product:", d)}
          initialSort={[
            {
              id: "sellingPrice",
              desc: true,
            },
          ]}
        />
      </section>
    </div>
  );
}

export default ProductsPage;
