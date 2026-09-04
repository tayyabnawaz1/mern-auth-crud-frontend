import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import Update from "./components/Update";
import AddProduct from "./components/AddProduct";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <Update />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
