import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeOrder } from "../redux/orderSlice";

const MyOrder = () => {
  const orders = useSelector((state) => state.order.orders); // Ambil data pesanan dari Redux
  const dispatch = useDispatch();

  const handleRemoveOrder = (orderId) => {
    const order = orders.find((order) => order.id === orderId);
    if (!order) return;

    if (
      window.confirm("Are you sure you want to remove this order from history?")
    ) {
      dispatch(removeOrder(orderId));

      alert("Order removed from history.");
    }
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
