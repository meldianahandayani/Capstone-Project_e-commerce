// src/App.js
import React from "react";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <div>
      <header>
        <h1>Fake Store</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
};

export default App;
