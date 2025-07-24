import React, { useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = (id) => {
    setCartItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="app-container">
      <Header cartCount={cartItems.length} />
      <div className="app-info">
        <h2>신발 상품 목록</h2>
        <p>현재 {products.length}개의 상품이 있습니다.</p>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={cartItems.includes(product.id)}
            onToggleCart={() => toggleCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
