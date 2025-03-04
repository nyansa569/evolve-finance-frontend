import React, { useState, useEffect } from "react";
import "./add-invoice.css";
import { getProducts } from "@/services/products_services";
import { createInvoice } from "@/services/invoice_services";
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

function AddInvoicePage() {
  const token = localStorage.getItem("token") || "";
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role || "";

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(role, token);
      setProducts(response || []);
      setFilteredProducts(response || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // State for invoice details
  // const [customerId, setCustomerId] = useState("");
  const [productList, setProductList] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [transactionFee, setTransactionFee] = useState<number>(10); // Fixed transaction fee
  const [platformFee, setPlatformFee] = useState<number>(10); // Fixed platform fee
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money");

  // Handle product search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle payment method change
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("Selected Payment Method:", e.target.value);
    setPaymentMethod(e.target.value);
  };

  // Add product to productList
  const addProduct = (product: Product) => {
    setProductList((prev) => [
      ...prev,
      { ...product, quantity: 1, total: product.sellingPrice },
    ]);
    setModalOpen(false); // Close the modal after adding
  };

  // Remove product from productList
  const removeProduct = (productId: string) => {
    setProductList((prev) =>
      prev.filter((product) => product._id !== productId)
    );
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    const subtotal = productList.reduce(
      (sum, product) => sum + product.sellingPrice * product.quantity,
      0
    );
    setSubtotal(subtotal);
  };

  // Calculate tax amount
  const calculateTaxAmount = () => {
    const tax = subtotal * 0.05; // 5% tax
    setTaxAmount(tax);
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    const total = subtotal + taxAmount + transactionFee + platformFee;
    setTotalAmount(total);
  };

  const handleCreateInvoice = async () => {
    // console.log(customerId);
    console.log(productList);
    console.log(paymentMethod);
    if ( productList.length === 0 || !paymentMethod) {
      alert("Please fill in all fields and add at least one product.");
      return;
    }

    try {
      const invoiceData = {
        // customerId,
        productList: productList.map((product) => ({
          productId: product._id,
          name: product.name, // Include name
          quantity: product.quantity,
          price: product.sellingPrice,
          discount: product.discount || 0, // Ensure discount is included, default to 0 if undefined
        })),
        subtotal,
        taxAmount,
        transactionFee,
        platformFee,
        totalAmount,
        paymentMethod,
      };

      console.log(invoiceData);

      const response = await createInvoice(invoiceData, token);
      alert("Invoice created successfully!");
      console.log("Invoice Response:", response);
      // **Reset all state variables after successful creation**
      // setCustomerId("");
      setProductList([]);
      setSubtotal(0);
      setTaxAmount(0);
      setTransactionFee(10); // Reset to default transaction fee
      setPlatformFee(10); // Reset to default platform fee
      setTotalAmount(0);
      setPaymentMethod("Mobile Money");
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice. Please try again.");
    }
  };

  // Update quantities of products
  const updateQuantity = (
    productId: string,
    action: "increment" | "decrement"
  ) => {
    setProductList((prev) => {
      return prev.map((product) => {
        if (product._id === productId) {
          const newQuantity =
            action === "increment"
              ? product.quantity + 1
              : product.quantity - 1;
          const newTotal = product.sellingPrice * Math.max(newQuantity, 1);
          return {
            ...product,
            quantity: Math.max(newQuantity, 1),
            total: newTotal,
          };
        }
        return product;
      });
    });
  };

  // Recalculate values when productList changes
  const handleProductListChange = () => {
    calculateSubtotal();
    calculateTaxAmount();
    calculateTotalAmount();
  };

  // Call handleProductListChange whenever the productList changes
  useEffect(() => {
    handleProductListChange();
  }, [productList]);

  return (
    <div className="add-invoice-container">
      {/* <div className="form-field form-field-spacing">
        <label>Customer ID</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter customer ID"
        />
      </div> */}

      {/* Modal for searching products */}
      {modalOpen && (
        <div className="search-modal">
          <div className="modal-content">
            <h2>Search Products</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by product name"
            />
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product._id}
                  className="cursor-pointer"
                  onClick={() => addProduct(product)}
                >
                  <div className="modal-product-item">
                    <img
                      src={product.productImage || "default-image.png"} // Placeholder image if product has no image
                      alt={product.name}
                      width="80"
                      height="80"
                      className="product-image"
                    />
                    <div className="modal-product-item-details">
                      <strong>{product.name}</strong>
                      <p>Price: {product.sellingPrice}</p>
                      <p>Discount: {product.discount}%</p>
                      <p>Stock Level: {product.stockLevel}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setModalOpen(false)}
              className="close-modal-button"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="product-list-section">
        <h3>Product List</h3>
        <ul className="product-list">
          {productList.map((product) => (
            <li key={product._id} className="single-list">
              <div className="inner-product">
                <img
                  src={product.productImage || "default-image.png"}
                  alt={product.name}
                  width={"150"}
                  height={"150"}
                />

                <div className="inner-product-info">
                  <h4>{product.name}</h4>
                  <p>Price: {product.sellingPrice}</p>
                  <div className="qty-div">
                    Quantity:
                    <div
                      className="qty-btn"
                      onClick={() => updateQuantity(product._id, "decrement")}
                    >
                      -
                    </div>
                    {product.quantity}
                    <div
                      className="qty-btn"
                      onClick={() => updateQuantity(product._id, "increment")}
                    >
                      +
                    </div>
                  </div>
                  <p>Total: {product.total}</p>
                </div>
                <div className="action-buttons">
                  <button onClick={() => removeProduct(product._id)}>-</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setModalOpen(true)}
          className="add-product-button"
        >
          Add Product
        </button>
      </div>

      {/* Invoice Summary */}
      <div className="invoice-summary">
        <div className="extras">
          <label>Subtotal: </label> {subtotal}
        </div>
        <div className="extras">
          <label>Tax Amount: </label> {taxAmount}
        </div>
        <div className="extras">
          <label>Transaction fee: </label> {transactionFee}
        </div>
        <div className="extras">
          <label>Platform fee: </label> {platformFee}
        </div>
        <div className="extras">
          <label>Total Amount: </label> {totalAmount}
        </div>
        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="payment-method-dropdown"
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          <option value="Mobile Money">Mobile Money</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      <button className="create-invoice-button" onClick={handleCreateInvoice}>
        Create Invoice
      </button>
    </div>
  );
}

export default AddInvoicePage;
