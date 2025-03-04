import { useState, useEffect } from "react";
import "./add-products.css";
import { updateProductById } from "@/services/products_services";

interface EditProductPageProps {
  product: {
    _id: string;
    name: string;
    description: string;
    costPrice: number;
    sellingPrice: number;
    stockLevel: number;
    discount: number;
    productImage?: string;
  };
  onClose: () => void;
}

const token = localStorage.getItem("token") || "";

function EditProductPage({ product, onClose }: EditProductPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    stockLevel: "",
    discount: "",
    productImage: null as File | null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormData({
      name: product.name,
      description: product.description,
      costPrice: product.costPrice.toString(),
      sellingPrice: product.sellingPrice.toString(),
      stockLevel: product.stockLevel.toString(),
      discount: product.discount.toString(),
      productImage: null,
    });
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, productImage: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating product...");
    setError("");
    setSuccess("");

    if (!formData.name || !formData.description) {
      setError("Name and description are mandatory");
      return;
    }

    try {
      console.log("Formdata is here...", formData);
      const updatedData = new FormData();
      updatedData.append("name", formData.name);
      updatedData.append("description", formData.description);
      updatedData.append("costPrice", formData.costPrice.toString());
      updatedData.append("sellingPrice", formData.sellingPrice.toString());
      updatedData.append("stockLevel", formData.stockLevel.toString());
      updatedData.append("discount", formData.discount.toString());

      if (formData.productImage) {
        updatedData.append("productImage", formData.productImage);
      }

      console.log("Updated Form Data from inside: ", updatedData);
      for (let pair of updatedData.entries()) {
        console.log("Changes here...", pair[0], pair[1]);
      }

      const response = await updateProductById(product._id, updatedData, token);
      setSuccess("Product updated successfully!");
      console.log(response);
      // onClose();
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="input-field"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="input-field"
          required
        />

        <input
          type="number"
          name="costPrice"
          value={formData.costPrice}
          onChange={handleChange}
          placeholder="Cost Price"
          className="input-field"
          required
        />

        <input
          type="number"
          name="sellingPrice"
          value={formData.sellingPrice}
          onChange={handleChange}
          placeholder="Selling Price"
          className="input-field"
          required
        />

        <input
          type="number"
          name="stockLevel"
          value={formData.stockLevel}
          onChange={handleChange}
          placeholder="Stock Level"
          className="input-field"
          required
        />

        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount (%)"
          className="input-field"
          required
        />

        <input
          type="file"
          name="productImage"
          onChange={handleFileChange}
          className="input-field"
          accept="image/*"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
