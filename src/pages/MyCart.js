import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { updateProductStock } from "../redux/productSlice";
import { addOrder } from "../redux/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "../components/ConfirmationDialog"; // Import dialog konfirmasi

const MyCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.items);

  const [showDialog, setShowDialog] = useState(false); // State untuk menampilkan dialog

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const product = products.find((product) => product.id === id);
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (newQuantity > product.quantity) {
      toast.error(`Insufficient stock. ${product.quantity} items left.`, {
        position: "top-right",
        autoClose: 3000,
      });
      newQuantity = product.quantity;
    }
    dispatch(updateCartQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart.", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleCheckout = () => {
    let isStockAvailable = true;

    cartItems.forEach((item) => {
      const product = products.find((product) => product.id === item.id);
      if (product.quantity < item.quantity) {
        toast.error(`Insufficient stock for product: ${product.title}.`, {
          position: "top-right",
          autoClose: 3000,
        });
        isStockAvailable = false;
      }
    });

    if (isStockAvailable) {
      const newOrder = {
        id: Date.now(),
        items: [...cartItems],
        date: new Date().toISOString(),
      };

      dispatch(addOrder(newOrder));
      cartItems.forEach((item) => {
        const product = products.find((product) => product.id === item.id);
        if (product.quantity >= item.quantity) {
          dispatch(
            updateProductStock({ id: item.id, quantity: item.quantity })
          );
        }
      });
      toast.success("Checkout successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/"); // Redirect ke halaman utama
    }
  };

  const confirmCheckout = () => {
    setShowDialog(false); // Tutup dialog
    handleCheckout(); // Lanjutkan proses checkout
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h1>My Cart</h1>
        <p>Your cart is empty.</p>
        <button style={styles.backButton} onClick={() => navigate("/")}>
          Go to Shop
        </button>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>My Cart</h1>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} style={styles.tableRow}>
              <td style={styles.productCell}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={styles.productImage}
                />
                <span>{item.title}</span>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  style={styles.input}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  style={styles.removeButton}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.totalContainer}>
        <h3>Total: ${calculateTotal()}</h3>
        <div style={styles.buttonsContainer}>
          <button style={styles.closeButton} onClick={() => navigate("/")}>
            Close
          </button>
          <button
            style={styles.checkoutButton}
            onClick={() => setShowDialog(true)} // Tampilkan dialog konfirmasi
          >
            Checkout
          </button>
          <button
            style={styles.orderButton}
            onClick={() => navigate("/my-order")} // Kembali ke halaman My Order
          >
            My Order
          </button>
        </div>
      </div>
      <ToastContainer />
      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to proceed with checkout?"
          onConfirm={confirmCheckout}
          onCancel={() => setShowDialog(false)} // Tutup dialog jika batal
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Roboto', sans-serif",
  },
  emptyContainer: {
    textAlign: "center",
    padding: "20px",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#f8f9fa",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s ease",
  },
  tableRowHover: {
    backgroundColor: "#f1f1f1",
  },
  productCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  productImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  input: {
    width: "60px",
    textAlign: "center",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  removeButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  totalContainer: {
    marginTop: "20px",
    textAlign: "right",
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  checkoutButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  orderButton: {
    padding: "10px 20px",
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default MyCart;
