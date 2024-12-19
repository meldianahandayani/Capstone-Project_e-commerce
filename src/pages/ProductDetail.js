import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === Number(id))
  );

  const status = useSelector((state) => state.products.status);
  const [quantity, setQuantity] = useState(1);
  if (status === "loading") {
    return <p>Loading product details...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load product details.</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (quantity > product.quantity) {
      alert(
        `Insufficient stock. ${product.title} has only ${product.quantity} items left.`
      );
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
      })
    );
    alert(`Added "${product.title}" (${quantity}) to cart!`);
  };
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > product.quantity) {
      alert(
        `Insufficient stock. ${product.title} has only ${product.quantity} items left.`
      );
      return;
    }

    setQuantity(newQuantity || 1);
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
        {/* gambar produk */}
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

        {/* detail produk */}
        <div style={{ flex: 1 }}>
          <h2>{product.title}</h2>
          <p style={{ fontStyle: "italic", color: "#555" }}>
            {product.category}
          </p>
          <p>{product.description}</p>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>
            Price: ${product.price}
          </p>
          <p style={styles.stock}>Stock: {product.quantity}</p> {}
          <div style={{ marginTop: "20px" }}>
            {}
            <input
              type="number"
              value={quantity}
              min="1"
              max={product.quantity}
              onChange={handleQuantityChange} // Menangani perubahan input quantity
              style={{
                padding: "5px",
                marginRight: "10px",
                width: "60px",
              }}
            />
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
              onClick={handleAddToCart}
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
const styles = {
  stock: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default ProductDetail;
