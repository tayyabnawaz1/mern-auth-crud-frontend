import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [product, setproduct] = useState({
    name: "",
    category: "",
    price: "",
  });
  const navigate = useNavigate();
  const inputChange = (e) => {
    const { name, value } = e.target;
    setproduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, price } = product;
    if (!name || !category || !price) {
      return handleError("name , category and price are required");
    }
    try {
      const url = "http://localhost:7979/auth_mern/products";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(product),
      });
      const result = await response.json();
      const { success, error, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        return handleError(details);
      } else {
        return handleError(message);
      }
    } catch (error) {
      return handleError(error);
    }
  };
  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter product name"
            autoFocus
            onChange={inputChange}
          />
          <input
            type="text"
            name="category"
            id="categpory"
            placeholder="Enter product category"
            onChange={inputChange}
          />
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter product price"
            onChange={inputChange}
          />
          <button type="submit">Submit </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
