import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  return (
    <Router>
      <Header /> {/* Menambahkan Header ke dalam aplikasi */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
