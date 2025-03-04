import { useState } from "react";
import "./add-products.css";
import { createProduct } from "@/services/products_services";

function AddProductsPage() {
  const token = localStorage.getItem("token") || "";

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    costPrice: string;
    sellingPrice: string;
    stockLevel: string;
    discount: string;
    productImage: File | null;
  }>({
    name: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    stockLevel: "",
    discount: "",
    productImage: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setError("");
    setSuccess("");

    // Validate required fields
    if (
      !formData.name ||
      !formData.description ||
      !formData.costPrice ||
      !formData.sellingPrice ||
      !formData.stockLevel ||
      !formData.discount
    ) {
      setError("All fields are mandatory");
      return;
    }
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("costPrice", formData.costPrice.toString());
      formDataToSend.append("sellingPrice", formData.sellingPrice.toString());
      formDataToSend.append("stockLevel", formData.stockLevel.toString());
      formDataToSend.append("discount", formData.discount.toString());

      if (formData.productImage) {
        formDataToSend.append("productImage", formData.productImage);
      }
      // Send request
      const response = await createProduct(formDataToSend, token);
      console.log(response)

      setSuccess("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        costPrice: "",
        sellingPrice: "",
        stockLevel: "",
        discount: "",
        productImage: null,
      });

      // console.log("Product created:", response);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message)
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
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AddProductsPage;
