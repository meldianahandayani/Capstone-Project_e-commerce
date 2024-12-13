import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams(); // Ambil parameter id dari URL
  const navigate = useNavigate();

  // Cari produk berdasarkan id
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === Number(id))
  );

  const status = useSelector((state) => state.products.status);

  if (status === "loading") {
    return <p>Loading product details...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load product details.</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const addToCart = () => {
    alert(`Added ${product.title} to cart!`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Product Details</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* Bagian gambar */}
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        />

        {/* Bagian detail produk */}
        <div style={{ flex: 1 }}>
          <h2>{product.title}</h2>
          <p style={{ fontStyle: "italic", color: "#555" }}>
            {product.category}
          </p>
          <p>{product.description}</p>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>
            Price: ${product.price}
          </p>
          <div style={{ marginTop: "20px" }}>
            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
