import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const updatedData = data.map((product) => ({ ...product, quantity: 20 }));
    localStorage.setItem("products", JSON.stringify(updatedData));

    return updatedData;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: savedProducts,
    status: "idle",
    error: null,
  },
  reducers: {
    updateProductStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((item) => item.id === id);
      if (product) {
        product.quantity -= quantity;
        if (product.quantity < 0) product.quantity = 0;
        localStorage.setItem("products", JSON.stringify(state.items));
      }
    },
    restoreProductStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((item) => item.id === id);
      if (product) {
        product.quantity += quantity;
        localStorage.setItem("products", JSON.stringify(state.items));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        localStorage.setItem("products", JSON.stringify(action.payload));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateProductStock, restoreProductStock } = productSlice.actions;
export default productSlice.reducer;
