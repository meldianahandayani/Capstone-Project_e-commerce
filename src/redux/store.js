import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
const asyncDispatchMiddleware = (store) => (next) => (action) => {
  if (typeof action.asyncDispatch === "function") {
    return action.asyncDispatch(store.dispatch, store.getState);
  }
  return next(action);
};
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Could not save state to localStorage", e);
  }
};
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state from localStorage", e);
    return undefined;
  }
};
const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncDispatchMiddleware),
  preloadedState: persistedState,
});
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
