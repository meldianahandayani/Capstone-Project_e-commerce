import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import MyCart from "./pages/MyCart";
import MyOrder from "./pages/MyOrder";

const App = () => {
  return (
    <Router>
      <Header /> {}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/my-order" element={<MyOrder />} />
      </Routes>
    </Router>
  );
};

export default App;
