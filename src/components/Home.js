import React, { useEffect, useState } from "react";
import ".//home.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();

  const fetchProduct = async (req, res) => {
    try {
      const url = "http://localhost:7979/auth_mern/products";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setProduct(result.product);
      }
      console.log(result.product);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    fetchProduct();
  }, []);
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("logout user");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const url = `http://localhost:7979/auth_mern/products/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      // console.log(result);
      if (result.success) {
        setProduct((prevproduct) =>
          prevproduct.filter((product) => product._id !== id),
        );
      } else {
        handleError(result.message);
      }
      // console.log(result.product);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="home">
      <h1>Wellcome {loggedInUser}</h1>
      <Link to="/addproduct" type="button" className="btn btn-primary">
        Add Product <i class="fa-solid fa-cart-arrow-down"></i>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => handleDeleteProduct(item._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>{" "}
                  <Link to={`/update/${item._id}`}>
                    <button type="button" className="btn btn-info">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
