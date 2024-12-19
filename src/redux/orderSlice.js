import { createSlice } from "@reduxjs/toolkit";

const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const initialState = {
  orders: savedOrders,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    removeOrder(state, action) {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order.id !== orderId);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
