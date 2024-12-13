import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../redux/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load products.</p>;
  }

  // Fungsi untuk navigasi ke detail produk
  const showDetails = (product) => {
    navigate(`/products/${product.id}`);
  };

  // Fungsi untuk menambahkan produk ke keranjang
  const addToCart = (product) => {
    if (!token) {
      // Redirect to login page if not logged in
      navigate("/login");
    } else {
      alert(`Added ${product.title} to cart!`);
      // You would typically dispatch an action to add the product to the cart here
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Product List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h3>{product.title}</h3>
            <p style={{ fontWeight: "bold" }}>Price: ${product.price}</p>
            <button
              style={{
                marginRight: "10px",
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => showDetails(product)}
            >
              Details
            </button>
            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
