import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

const Update = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Get product by ID
  const fetchProduct = async () => {
    try {
      const url = `http://localhost:7979/auth_mern/products/${id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();

      console.log(result);

      if (result.success) {
        setProduct({
          name: result.product.name,
          category: result.product.category,
          price: result.product.price,
        });
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  // Fetch product when page loads
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:7979/auth_mern/products/${id}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(product),
      });

      const result = await response.json();

      console.log(result);

      if (result.success) {
        handleSuccess(result.message || "Product updated successfully");

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Update Product</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter product name"
            autoFocus
            value={product.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            id="category"
            placeholder="Enter product category"
            value={product.category}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter product price"
            value={product.price}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
};

export default Update;