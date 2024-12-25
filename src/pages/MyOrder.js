import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeOrder } from "../redux/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "../components/ConfirmationDialog";

const MyOrder = () => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleRemoveOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDialog(true);
  };

  const confirmRemoveOrder = () => {
    dispatch(removeOrder(selectedOrderId));
    setShowDialog(false);
    toast.success("Order removed from history.", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const cancelRemoveOrder = () => {
    setShowDialog(false);
  };

  const calculateTotalPrice = (items) => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (orders.length === 0) {
    return (
      <div style={styles.container}>
        <h1>My Orders</h1>
        <p>You do not have any orders in your history.</p>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>My Orders</h1>
      {orders.map((order) => {
        const orderTotalPrice = calculateTotalPrice(order.items);
        return (
          <div key={order.id} style={styles.orderCard}>
            <h3>Order ID: {order.id}</h3>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => {
                  const itemTotal = (item.price * item.quantity).toFixed(2);
                  return (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>${itemTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p style={styles.orderTotal}>Total: ${orderTotalPrice}</p>
            <button
              style={styles.cancelButton}
              onClick={() => handleRemoveOrder(order.id)}
            >
              Remove Order History
            </button>
          </div>
        );
      })}
      <ToastContainer />
      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to remove this order from history?"
          onConfirm={confirmRemoveOrder}
          onCancel={cancelRemoveOrder}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  orderCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  orderTotal: {
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default MyOrder;
